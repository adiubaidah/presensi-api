import { Injectable, ConflictException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { AkunDto, AkunDtoEdit } from 'src/akun/akun.dto';
import { Role } from '@prisma/client';

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
    const akun = await this.prisma.akun.findMany({
      where: {
        role: {
          in: ['dosen', 'mahasiswa', 'admin'],
        },
      },
    });
    return akun;
  }

  async findUsersByRole(role: Role, relation: number) {
    return await this.prisma.akun.findMany({
      where: {
        role: role,
        ...(relation && {
          [role]: relation === 1 ? { isNot: null } : { is: null },
        }),
      },
    });
  }

  async dosen(relation: number) {
    return this.findUsersByRole('dosen', relation);
  }

  async mahasiswa(relation: number) {
    return this.findUsersByRole('mahasiswa', relation);
  }

  async update(findUsername: string, payload: AkunDtoEdit) {
    const { username, role } = payload;

    const existingAkun = await this.prisma.akun.findUnique({
      where: {
        username,
        NOT: {
          username,
        },
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

  async akunDetail(username: string) {
    const akun = await this.prisma.akun.findUnique({
      where: {
        username,
      },
      select: {
        dosen: true,
        mahasiswa: true,
        username: true,
        role: true,
      },
    });
    return akun.role === 'dosen' ? akun.dosen : akun.mahasiswa;
  }

  async delete(username: string) {
    return await this.prisma.akun.delete({
      where: {
        username,
      },
    });
  }
}
