import { Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FilmService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createFilmDto: CreateFilmDto) {
    return 'This action adds a new film';
  }

  async findAll() {
    return await this.prismaService.film.findMany();
  }

  async findOne(id: number) {
    return `This action returns a #${id} film`;
  }

  async update(id: number, updateFilmDto: UpdateFilmDto) {
    return `This action updates a #${id} film`;
  }

  async remove(id: number) {
    return `This action removes a #${id} film`;
  }
}
