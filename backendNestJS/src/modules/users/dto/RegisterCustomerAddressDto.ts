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
  @Type(() => Number) 
  readonly utilisateur_id: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  readonly adresse_rue: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 6)
  readonly adresse_numero: string;

  @IsOptional()
  @IsString()
  @Length(1, 6)
  readonly adresse_boite?: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 6)
  readonly adresse_cp: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  readonly adresse_ville: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  readonly adresse_pays: string;




}
