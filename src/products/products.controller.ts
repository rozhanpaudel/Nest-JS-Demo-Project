import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductDto } from './dtos/product.dto';
import { ProductService } from './products.service';

@Controller('api/products')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get('/')
  getProducts() {
    return 'Products items';
  }

  @Post('/create')
  createProduct(@Body() productDetails: ProductDto) {
    this.productService.createProduct(productDetails);
  }
}
