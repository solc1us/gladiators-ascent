import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { GladiatorsService } from './gladiators.service';
import { CreateGladiatorDto } from './dto/create-gladiator.dto';
import { UpdateGladiatorDto } from './dto/update-gladiator.dto';

@Controller('gladiators')
export class GladiatorsController {
  constructor(private readonly service: GladiatorsService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }
  @Post() create(@Body() dto: CreateGladiatorDto) { return this.service.create(dto); }
  @Patch(':id') update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateGladiatorDto) { return this.service.update(id, dto); }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}
