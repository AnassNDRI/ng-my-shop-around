import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordConfirmationDto {
  @IsEmail()
  @IsNotEmpty()
  utilisateur_email: string;

  @IsString()
  @IsNotEmpty()
  utilisateur_mdp: string;

  @IsString() // le code généré et envoyé à l'utilisateur
  @IsNotEmpty()
  code: string;
}
