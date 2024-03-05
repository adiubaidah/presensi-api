import { Module } from '@nestjs/common';
import { MatakuliahService } from './matakuliah.service';
import { MatakuliahController } from './matakuliah.controller';

@Module({
  providers: [MatakuliahService],
  controllers: [MatakuliahController]
})
export class MatakuliahModule {}
