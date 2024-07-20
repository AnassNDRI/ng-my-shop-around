import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import IsLowercase from 'src/modules/utils/customValidator';

export class SignupCustomerDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 70)
  readonly utilisateur_nom: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 70)
  readonly utilisateur_prenom: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  readonly utilisateur_date_naissance: Date;

  @IsOptional()
  @IsString()
  readonly utilisateur_gsm: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(1, 70)
  @IsLowercase({
    message: "L'email ne doit pas contenir de lettres majuscules.",
  })
  readonly utilisateur_email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 250)
  readonly utilisateur_mdp: string;
}
