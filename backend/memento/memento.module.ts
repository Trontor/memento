import { Module } from '@nestjs/common';
import { MementoService } from './memento.service';

@Module({
  providers: [MementoService]
})
export class MementoModule {}
