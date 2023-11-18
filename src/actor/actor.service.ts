import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActorService {
  private readonly logger = new Logger(ActorService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create(createActorDto: CreateActorDto) {
    const created = await this.prismaService.actor.create({
      data: createActorDto,
    });

    return created;
  }

  async findAll() {
    this.logger.log('findAll() is called');
    return await this.prismaService.actor.findMany();
  }

  async findOne(id: number) {
    const one = await this.prismaService.actor.findUnique({
      where: { actor_id: id },
    });

    if (!one) {
      throw new BadRequestException({
        message: 'Could not find actor with this id',
      });
    }

    return one;
  }

  async update(id: number, updateActorDto: UpdateActorDto) {
    const existed = await this.prismaService.actor.findUnique({
      where: {
        actor_id: id,
      },
    });

    if (!existed) {
      throw new BadRequestException({
        message: 'Could not find actor with this id',
      });
    }

    const updated = await this.prismaService.actor.update({
      where: {
        actor_id: id,
      },
      data: updateActorDto,
    });

    return updated;
  }

  async remove(id: number) {
    const existed = await this.prismaService.actor.findUnique({
      where: {
        actor_id: id,
      },
    });

    if (!existed) {
      throw new BadRequestException({
        message: 'Could not find actor with this id',
      });
    }

    await this.prismaService.actor.delete({
      where: {
        actor_id: id,
      },
    });
  }
}
