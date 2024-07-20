import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ProductService } from './articles.service';

@Module({
  controllers: [ArticlesController],
  providers: [ProductService],
})
export class ArticlesModule {}
