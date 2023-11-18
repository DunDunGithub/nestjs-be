import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ActorModule } from './actor/actor.module';
import { FilmModule } from './film/film.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, ActorModule, FilmModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
