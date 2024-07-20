import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';


export class RegisterCustomerAddressDto {



  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number) // pour s'assurer que roleId est un nombre
  readonly utilisateur_id: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  readonly adresse_rue: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  readonly adresse_numero: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  readonly adresse_boite?: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  readonly adresse_cp: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  readonly adresse_ville: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  readonly adresse_pays: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number) // pour s'assurer que roleId est un nombre
  readonly adresse_type: number;
  
}
