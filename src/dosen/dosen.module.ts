import { Module } from '@nestjs/common';
import { DosenController } from './dosen.controller';
import { DosenService } from './dosen.service';

@Module({
  controllers: [DosenController],
  providers: [DosenService]
})
export class DosenModule {}
