import { Transform } from 'class-transformer';
import { IsBoolean, IsIn, IsInt, IsString, Min, MinLength, ValidateIf } from 'class-validator';

export class CreateGladiatorDto {
  @Transform(({ value }: { value: unknown }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @MinLength(3)
  name: string;

  @IsIn(['Balanced', 'Heavy', 'Agile'])
  style: string;

  @ValidateIf((_, value: unknown) => value !== undefined) @IsInt() @Min(0)
  kills?: number;

  @ValidateIf((_, value: unknown) => value !== undefined) @IsIn(['Alive', 'Dead'])
  status?: string;

  @ValidateIf((_, value: unknown) => value !== undefined) @IsBoolean()
  isPlayer?: boolean;
}
