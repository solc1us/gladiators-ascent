import { PartialType } from '@nestjs/mapped-types';
import { CreateGladiatorDto } from './create-gladiator.dto';

export class UpdateGladiatorDto extends PartialType(CreateGladiatorDto, { skipNullProperties: false }) {}
