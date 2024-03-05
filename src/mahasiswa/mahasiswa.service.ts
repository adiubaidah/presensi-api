import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MahasiswaService {
  constructor(private prisma: PrismaService) {}
  
  
}
