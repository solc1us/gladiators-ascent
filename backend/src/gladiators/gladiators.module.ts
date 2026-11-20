import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { GladiatorsController } from './gladiators.controller';
import { GladiatorsService } from './gladiators.service';

@Module({ imports: [PrismaModule], controllers: [GladiatorsController], providers: [GladiatorsService] })
export class GladiatorsModule {}
