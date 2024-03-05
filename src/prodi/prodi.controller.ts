import { Controller } from '@nestjs/common';
import { ProdiService } from './prodi.service';

@Controller('prodi')
export class ProdiController {
  constructor(private prodiService: ProdiService) {}
}
