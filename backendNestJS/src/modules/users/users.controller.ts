import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { Body, Query, Res, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { ResetPasswordConfirmationDto } from './dto/resetPasswordConfirmationDto';
import { ResetPasswordDemandDto } from './dto/resetPasswordDemandDto';
import { SigninDto } from './dto/signinDto';
import { SignupCustomerDto } from './dto/signupCustomerDto';
import { UsersService } from './users.service';

import { GetUserId } from 'src/common/decorators/get-user-id.decorator';
import { ErrorMessages } from 'src/shared/error-management/errors-message';

@Controller('api/users')
//@UseInterceptors(LoggingInterceptor)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$   CREATE  $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  Create User Candidat @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  @Post('register-customer')
  signupRecruiter(@Body() signupRecruiterDto: SignupCustomerDto) {
    return this.userService.signupCustomer(signupRecruiterDto);
  }
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  Login @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  @Post('signin')
  signin(@Body() signinDto: SigninDto) {
    return this.userService.signin(signinDto);
  }

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  Logout @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@GetUserId() userId: number) {
    return this.userService.logout(userId);
  }
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  Reset Password @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  @Post('reset-password')
  resetPasswordDemand(@Body() resetPasswordDemandDto: ResetPasswordDemandDto) {
    return this.userService.resetPasswordDemand(resetPasswordDemandDto);
  }
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  Reset Password Confirmation@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  @Post('reset-password-confirmation')
  resetPasswordConfirmation(
    @Body() resetPasswordConfirmationDto: ResetPasswordConfirmationDto,
  ) {
    console.log(resetPasswordConfirmationDto); // Imprimer les données reçues
    return this.userService.resetPasswordConfirmation(
      resetPasswordConfirmationDto,
    );
  }

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  refreshToken @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // Définissez l'endpoint pour le rafraîchissement du token ici
  @Post('refreshToken')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    const newToken = await this.userService.refreshToken(refreshToken);
    if (!newToken) {
      throw new UnauthorizedException('Could not refresh token');
    }
    return newToken;
  }

  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$   READ  $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  Confirmation de l'adresse mail @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  @Get('confirm-email')
  async confirmEmail(@Query('token') token: string, @Res() res: Response) {
    const frontendUrl = process.env.FRONTEND_URL;

    try {
      const apiResponse = await this.userService.confirmUserEmail(token);

      // Vérification du résultat de la confirmation de l'email
      if (apiResponse.result) {
        // Si la confirmation est réussie, redirigez vers la page avec un message de succès
        res.redirect(
          //   `http://localhost:4200/account-confirm?status=success&message=${encodeURIComponent(apiResponse.data)}`,
          `${frontendUrl}/account-confirm?status=success&message=${encodeURIComponent(apiResponse.data)}`,
        );
      } else {
        // Si apiResponse.result est false, cela signifie que la méthode a traité une certaine logique pour renvoyer false.
        // Dans ce cas, redirigez vers une page d'erreur avec un message approprié (s'il y a lieu)
        res.redirect(
          // `http://localhost:4200/account-confirm?status=failure&message}`,
          `${frontendUrl}/account-confirm?status=failure&message}`,
        );
      }
    } catch (error) {
      // Gestion des exceptions spécifiques lancées par confirmUserEmail
      let errorMessageKey = ErrorMessages.EMAIL_CONFIRMATION_INVALID;

      if (error instanceof NotFoundException) {
        errorMessageKey = ErrorMessages.EMAIL_CONFIRMATION_INVALID;
      } else if (error instanceof BadRequestException) {
        errorMessageKey = ErrorMessages.EMAIL_CONFIRMATION_INVALID;
      }
      // Redirection vers la page Angular avec le message d'erreur
      res.redirect(
        // `http://localhost:4200/account-confirm?status=failure&message=${encodeURIComponent(errorMessageKey)}`,
        `${frontendUrl}/account-confirm?status=failure&message=${encodeURIComponent(errorMessageKey)}`,
      );
    }
  }

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ User Profile Details @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // Typage du paramètre de requête pour assurer la conformité avec l'interface User
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@GetUserId() userId: number) {
    return this.userService.getUserProfile(userId);
  }
}
