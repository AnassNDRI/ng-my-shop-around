import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUserId } from 'src/common/decorators/get-user-id.decorator';
import { CreateAddressDto } from './dto/createAddressDto';

@Controller('api/address')
export class AddressController {

  constructor(private readonly addressService: AddressService) {}


  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$   CREATE  $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  Create Customer Address @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  @UseGuards(AuthGuard('jwt'))
  @Post('address')
  async registerCustomerAddress(
    @Body() createAddressDto: CreateAddressDto, 
    @GetUserId() customerId: number,  billingAddressId?: number 
  ) {

    return this.addressService.registerCustomerAddress(
      createAddressDto, customerId,  billingAddressId
    );
  }
}
