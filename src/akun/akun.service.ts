import { Injectable, ConflictException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { AkunDto, AkunDtoEdit } from 'src/akun/akun.dto';
@Injectable()
export class AkunService {
  constructor(private prisma: PrismaService) {}

  async createAkun(payload: AkunDto) {
    const { username, role } = payload;

    const existingAkun = await this.prisma.akun.findUnique({
      where: {
        username,
      },
    });
    // console.log(existingAkun)
    if (existingAkun) throw new ConflictException('username telah terpakai');

    const newAkun = await this.prisma.akun.create({
      data: {
        isActive: true,
        username,
        password: await hash(payload.password, 10),
        role,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...restNewAkun } = newAkun;
    return { restNewAkun };
  }

  async allAkun() {
    const akun = await this.prisma.akun.findMany();
    return akun;
  }

  async dosen() {
    const dosen = await this.prisma.akun.findMany({
      where: {
        role: 'dosen',
      },
    });
    return dosen;
  }

  async mahasiswa() {
    const dosen = await this.prisma.akun.findMany({
      where: {
        role: 'mahasiswa',
      },
    });
    return dosen;
  }

  async update(findUsername: string, payload: AkunDtoEdit) {
    const { username, role } = payload;

    const existingAkun = await this.prisma.akun.findUnique({
      where: {
        username,
      },
    });
    if (existingAkun) throw new ConflictException('username telah terpakai');

    const editedAkun = await this.prisma.akun.update({
      where: {
        username: findUsername,
      },
      data: {
        isActive: true,
        username,
        password: payload.password
          ? await hash(payload.password, 10)
          : undefined,
        role,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...restEditedAkun } = editedAkun;
    return { restEditedAkun };
  }

  async findByUsername(username: string) {
    const Akun = await this.prisma.akun.findUnique({
      where: {
        username,
      },
    });
    return Akun;
  }

  async delete(username: string) {
    return await this.prisma.akun.delete({
      where: {
        username,
      },
    });
  }
}
