import { OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { PertemuanService } from '../pertemuan.service';
import { PresensiService } from 'src/presensi/presensi.service';
import { Mahasiswa, Role } from '@prisma/client';
import { KelasService } from 'src/kelas/kelas.service';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST'],
    transports: ['websocket', 'polling'],
  },
})
export class PertemuanEvent implements OnModuleInit {
  constructor(
    private pertemuanService: PertemuanService,
    private presensiService: PresensiService,
    private kelasService: KelasService,
  ) {}
  @WebSocketServer()
  server: Server;
  intervals = new Map<number, NodeJS.Timeout>();
  remainingTimes = new Map<number, number>();
  pertemuanUsers = new Map<number, PertemuanUser[]>();
  pertemuanPresensi = new Map<number, Record<string, boolean>>();

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      // console.log('Connected');
    });
  }

  @SubscribeMessage('join-room')
  onJoinRoom(
    @MessageBody() pertemuanPayload: { id: number; user: PertemuanUser },
    @ConnectedSocket() client: Socket,
  ) {
    this.server.socketsJoin(`pertemuan:${pertemuanPayload.id}`);
    this.server
      .to(`pertemuan:${pertemuanPayload.id}`)
      .emit(`notif-join`, `${client.id} baru saja join`);
    addUserToPertemuan(
      this.pertemuanUsers,
      pertemuanPayload.id,
      pertemuanPayload.user,
    );
    if (this.intervals.has(pertemuanPayload.id)) {
      //agar menerima informasi yang sama
      this.server.to(client.id).emit('countdown-start');
    }
    if (
      pertemuanPayload.user.role === 'dosen' &&
      this.pertemuanPresensi.get(pertemuanPayload.id)
    ) {
      //untuk mengetahui data - data presensi sekarang
      const presensiActive = this.pertemuanPresensi.get(pertemuanPayload.id);
      this.server.to(client.id).emit('presensi-active', presensiActive);
    } else {
      //untuk mengetahui apakah mahsiswa sudah presensi atau be`lum
      const pertemuan = this.pertemuanPresensi.get(pertemuanPayload.id);
      if (!!pertemuan) {
        const isPresence = pertemuan[pertemuanPayload.user.username];
        if (isPresence) {
          this.server.to(client.id).emit('is-presence', true);
        }
      }
    }
  }

  @SubscribeMessage('start-timer')
  async onStartTimer(
    @MessageBody()
    { pertemuan_id, kelasKode }: { kelasKode: string; pertemuan_id: number },
  ) {
    const anggotaKelas = (await this.kelasService.findAnggota(
      kelasKode,
    )) as unknown as Mahasiswa[];
    const presensiAnggota = anggotaKelas.reduce(
      (accumulator: Record<string, boolean>, currentValue: Mahasiswa) => {
        accumulator[currentValue.nim] = false;
        return accumulator;
      },
      {} as Record<string, boolean>, // Menyediakan nilai awal dan menandai tipe secara eksplisit
    );
    const pertemuanStart = await this.pertemuanService.startTimer(pertemuan_id);
    this.pertemuanPresensi.set(pertemuan_id, presensiAnggota);
    const elapsedTime = Math.floor(
      (Date.now() - pertemuanStart.waktuMulai.getTime()) / 1000,
    );
    let remainingTime = pertemuanStart.timerPresensi - elapsedTime;

    if (remainingTime > 0) {
      this.server.to(`pertemuan:${pertemuan_id}`).emit('countdown-start');
      const interval = setInterval(async () => {
        remainingTime--;
        if (remainingTime <= 0) {
          clearInterval(interval);
          this.intervals.delete(pertemuan_id);
          this.server.to(`pertemuan:${pertemuan_id}`).emit('countdown-end');
          await this.pertemuanService.stopTimer(pertemuan_id);
          const result = await insertPresence(
            this.pertemuanPresensi.get(pertemuan_id),
            pertemuan_id,
            this.presensiService,
          );
          // const result = 1;
          this.server
            .to(`pertemuan:${pertemuan_id}`)
            .emit(result === 1 ? 'presensi-saved' : 'presensi-fail');
          this.pertemuanPresensi.delete(pertemuan_id);
        } else {
          this.server
            .to(`pertemuan:${pertemuan_id}`)
            .emit('countdown', remainingTime);
        }
      }, 1000);
      this.intervals.set(pertemuan_id, interval);
    }
  }

  @SubscribeMessage('stop-timer')
  async onStopTimer(
    @MessageBody()
    { pertemuan_id }: { pertemuan_id: number },
  ) {
    await this.pertemuanService.stopTimer(pertemuan_id);
    this.intervals.delete(pertemuan_id);
    const result = await insertPresence(
      this.pertemuanPresensi.get(pertemuan_id),
      pertemuan_id,
      this.presensiService,
    );
    this.server
      .to(`pertemuan:${pertemuan_id}`)
      .emit(result === 1 ? 'presensi-saved' : 'presensi-fail');
    this.server.to(`pertemuan:${pertemuan_id}`).disconnectSockets();
  }

  @SubscribeMessage('presensi')
  async onPresensi(@MessageBody() body: PresensiEvent) {
    const { pertemuan_id, nim } = body;

    //cek terlebih dahulu apakah array atau tidak
    if (Array.isArray(nim)) {
      //berarti yang melakukan dosen
      nim.forEach((n) => {
        this.pertemuanPresensi.get(pertemuan_id)[n] = true;
      });
    } else {
      this.pertemuanPresensi.get(pertemuan_id)[nim] = true;
      this.server.to(`pertemuan:${pertemuan_id}`).emit('presensi-success', nim);
    }
    this.server.to(`pertemuan:${pertemuan_id}`).emit('presensi-new', nim);
  }
}

function addUserToPertemuan(
  pertemuan: Map<number, PertemuanUser[]>,
  pertemuan_id: number,
  newUser: PertemuanUser,
) {
  const users = pertemuan.get(pertemuan_id);

  if (!users) {
    // Jika belum ada user sama sekali untuk pertemuan ini, langsung set
    pertemuan.set(pertemuan_id, [newUser]);
  } else {
    // Cek apakah sudah ada user dengan username yang sama di pertemuan ini
    const userExists = users.some((user) => user.username === newUser.username);

    if (!userExists) {
      // Jika belum ada, tambahkan user baru ke dalam array
      users.push(newUser);
      pertemuan.set(pertemuan_id, users);
    }
    // Jika sudah ada, tidak melakukan apa-apa (atau bisa juga memberi feedback)
  }
}

async function insertPresence(
  pertemuanPresensi: Record<string, boolean>,
  pertemuan_id: number,
  presensiService: PresensiService,
) {
  try {
    for (const nim in pertemuanPresensi) {
      await presensiService.create(
        pertemuan_id,
        nim,
        pertemuanPresensi[nim] ? 'masuk' : 'alpha',
      );
    }
    return 1;
  } catch (err) {
    console.error('SOCKET_' + err);
    return 0;
  }
}

type PresensiEvent = {
  pertemuan_id: number;
  nim: string | string[];
};

type PertemuanUser = {
  username: string;
  role: Role;
};
