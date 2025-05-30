import { Module } from '@nestjs/common';
import { AcknowledgmentsService } from './acknowledgments.service';

@Module({
  providers: [AcknowledgmentsService]
})
export class AcknowledgmentsModule {}
