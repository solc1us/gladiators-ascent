import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGladiatorDto } from './dto/create-gladiator.dto';
import { UpdateGladiatorDto } from './dto/update-gladiator.dto';
import { Gladiator } from './entities/gladiator.entity';

@Injectable()
export class GladiatorsService {
  private gladiators: Gladiator[] = [
    { id: 1, name: 'Maximus', style: 'Heavy', kills: 58, status: 'Alive', isPlayer: false },
    { id: 2, name: 'Aurelius', style: 'Balanced', kills: 53, status: 'Alive', isPlayer: false },
    { id: 3, name: 'Cassius', style: 'Agile', kills: 47, status: 'Alive', isPlayer: false },
    { id: 4, name: 'Brutus', style: 'Heavy', kills: 43, status: 'Dead', isPlayer: false },
    { id: 5, name: 'Titus', style: 'Balanced', kills: 39, status: 'Alive', isPlayer: false },
    { id: 6, name: 'Spartacus', style: 'Heavy', kills: 35, status: 'Dead', isPlayer: false },
    { id: 7, name: 'Lucius', style: 'Agile', kills: 31, status: 'Alive', isPlayer: false },
    { id: 8, name: 'Decimus', style: 'Balanced', kills: 26, status: 'Alive', isPlayer: false },
    { id: 9, name: 'Gaius', style: 'Heavy', kills: 22, status: 'Dead', isPlayer: false },
    { id: 10, name: 'Flavius', style: 'Agile', kills: 18, status: 'Alive', isPlayer: false },
    { id: 11, name: 'Marcus', style: 'Balanced', kills: 12, status: 'Alive', isPlayer: true },
  ];
  private nextId = 12;

  private checkName(name: string, excludedId?: number) {
    if (this.gladiators.some(g => g.id !== excludedId && g.name.toLowerCase() === name.trim().toLowerCase())) {
      throw new ConflictException('Gladiator name already exists');
    }
  }
  findAll() { return this.gladiators; }
  findOne(id: number) {
    const gladiator = this.gladiators.find(g => g.id === id);
    if (!gladiator) throw new NotFoundException('Gladiator not found');
    return gladiator;
  }
  create(dto: CreateGladiatorDto) {
    this.checkName(dto.name);
    const gladiator: Gladiator = { id: this.nextId++, name: dto.name.trim(), style: dto.style, kills: dto.kills ?? 0, status: dto.status ?? 'Alive', isPlayer: dto.isPlayer ?? true };
    this.gladiators.push(gladiator);
    return gladiator;
  }
  update(id: number, dto: UpdateGladiatorDto) {
    const gladiator = this.findOne(id);
    if (dto.name !== undefined) this.checkName(dto.name, id);
    Object.assign(gladiator, dto);
    return gladiator;
  }
  remove(id: number) {
    const gladiator = this.findOne(id);
    this.gladiators = this.gladiators.filter(g => g.id !== id);
    return gladiator;
  }
}
