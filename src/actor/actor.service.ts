import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ActorService {

  constructor(private readonly PrismaService: PrismaService){}

  async create(createActorDto: CreateActorDto) {
    const created = await this.PrismaService.actor.create({
      data : createActorDto
    })
    
    return created
  }

  async findAll() {
    return await this.PrismaService.actor.findMany();
  }

  async findOne(id: number) {
    const one = await this.PrismaService.actor.findUnique({
      where: { actor_id: id }
    })

    if(!one){
      throw new BadRequestException({
        message: 'Could not find actor with this id'
      })
    }

    return one;
  }


  async update(id: number, updateActorDto: UpdateActorDto) {
    const existed = await this.PrismaService.actor.findUnique({
      where : {
        actor_id : id
      }
    })
  
    if(!existed){
      throw new BadRequestException({
        message : "Could not find actor with this id"
      })
    }
  
    const updated = await this.PrismaService.actor.update({
      where : {
        actor_id : id
      },
      data : updateActorDto
    })
  
    return updated
  }

  async remove(id: number) {
    const existed = await this.PrismaService.actor.findUnique({
      where : {
        actor_id : id
      }
    })
  
    if(!existed){
      throw new BadRequestException({
        message : "Could not find actor with this id"
      })
    }
  
    await this.PrismaService.actor.delete({
      where : {
        actor_id : id
      }
    })
  }
}
