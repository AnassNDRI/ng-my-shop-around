import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateAddressDto {

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly utilisateur_id: number;


  @IsNotEmpty()
  @IsString()
  @Length(3, 250)
  readonly adresse_rue: string;

  @IsOptional()
  @IsString()
  @Length(0, 4)
  readonly adresse_numero: string;

  @IsNotEmpty()
  @IsString()
  @Length(0, 4)
  readonly adresse_cp: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 70)
  readonly adresse_ville: string;

  
  @IsNotEmpty()
  @IsString()
  @Length(2, 70)
  readonly adresse_pays: string;


 

}
