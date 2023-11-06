import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ActorModule } from './actor/actor.module';

@Module({
  imports: [PrismaModule, ActorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
