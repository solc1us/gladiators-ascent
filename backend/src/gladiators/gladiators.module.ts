import { Module } from '@nestjs/common';
import { GladiatorsController } from './gladiators.controller';
import { GladiatorsService } from './gladiators.service';

@Module({ controllers: [GladiatorsController], providers: [GladiatorsService] })
export class GladiatorsModule {}
