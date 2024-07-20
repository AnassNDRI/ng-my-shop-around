import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {
  @IsNotEmpty()
  @IsEmail()
  readonly utilisateur_email: string;

  @IsNotEmpty()
  @IsString()
  readonly utilisateur_mdp: string;
}
