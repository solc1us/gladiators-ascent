import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGladiatorDto } from './dto/create-gladiator.dto';
import { UpdateGladiatorDto } from './dto/update-gladiator.dto';

@Injectable()
export class GladiatorsService {
  constructor(private readonly prisma: PrismaService) {}

  private async checkName(name: string, excludedId?: number) {
    const existing = await this.prisma.gladiator.findFirst({
      where: {
        name: { equals: name.trim(), mode: 'insensitive' },
        ...(excludedId !== undefined ? { id: { not: excludedId } } : {}),
      },
    });
    if (existing) throw new ConflictException('Gladiator name already exists');
  }

  private handleError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') throw new ConflictException('Gladiator name already exists');
      if (error.code === 'P2025') throw new NotFoundException('Gladiator not found');
    }
    throw error;
  }

  findAll() {
    return this.prisma.gladiator.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const gladiator = await this.prisma.gladiator.findUnique({ where: { id } });
    if (!gladiator) throw new NotFoundException('Gladiator not found');
    return gladiator;
  }

  async create(dto: CreateGladiatorDto) {
    await this.checkName(dto.name);
    try {
      return await this.prisma.gladiator.create({ data: { ...dto, name: dto.name.trim() } });
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: number, dto: UpdateGladiatorDto) {
    await this.findOne(id);
    if (dto.name !== undefined) await this.checkName(dto.name, id);
    try {
      return await this.prisma.gladiator.update({
        where: { id },
        data: { ...dto, ...(dto.name !== undefined ? { name: dto.name.trim() } : {}) },
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.gladiator.delete({ where: { id } });
    } catch (error) {
      this.handleError(error);
    }
  }
}
