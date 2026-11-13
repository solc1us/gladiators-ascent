import { Module } from '@nestjs/common';
import { GladiatorsModule } from './gladiators/gladiators.module';

@Module({ imports: [GladiatorsModule] })
export class AppModule {}
