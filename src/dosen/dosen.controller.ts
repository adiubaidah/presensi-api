import { Controller } from '@nestjs/common';
import { DosenService } from './dosen.service';

@Controller('dosen')
export class DosenController {
  constructor(private dosenService: DosenService) {}
}
