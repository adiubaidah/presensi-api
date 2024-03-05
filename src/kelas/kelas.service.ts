import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class KelasService {
  constructor(private prisma: PrismaService) {}
  
}
