import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './articles.service';

@Controller('api/products')
export class ArticlesController {
  constructor(private readonly productService: ProductService) {}

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  Get all Product @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  @Get('list')
  async getAllTimeProducts() {
    return this.productService.getAllTimeProducts();
  }

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ product Detail   @@@@@@@@@@@@@@@@@@@@@@@@@@@@
  @Get('detail/:article_id')
  async productDetail(@Param('article_id', ParseIntPipe) article_id: number) {
    return this.productService.productDetail(article_id);
  }

  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Get by category Id  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  @Get('category/:categorie_id')
  async getBycategoryId(
    @Param('categorie_id', ParseIntPipe) categorie_id: number,
  ) {
    return this.productService.getBycategoryId(categorie_id);
  }


    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Get by category Id  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @Get('category')
    async getCategoryList() {
      return this.productService.getCategoryList();
    }

    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Get by category Id  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @Get('tva')
    async getTvaList() {
      return this.productService.getTvaList();
    }
}
