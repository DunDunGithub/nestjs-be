import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import {
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Actor')
@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @ApiOperation({ summary: 'Create an actor' })
  @Post()
  create(@Body() createActorDto: CreateActorDto) {
    return this.actorService.create(createActorDto);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all actors' })
  @Get()
  findAll() {
    return this.actorService.findAll();
  }

  @ApiOperation({ summary: 'Get an actor by id' })
  @ApiParam({
    name: 'id', //
    description: 'id of the actor',
    example: '1',
  })
  @ApiOkResponse({
    description: 'Return an actor',
    schema: {
      example: {
        actor_id: '1',
        first_name: 'Dung',
        last_name: 'Vu',
        last_update: new Date('2006-02-15 04:34:33'),
      },
    },
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actorService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an actor' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActorDto: UpdateActorDto) {
    return this.actorService.update(+id, updateActorDto);
  }

  @ApiOperation({ summary: 'Delete an actor' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actorService.remove(+id);
  }
}
