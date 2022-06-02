/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dtos/product.dto';
import { Product } from './entities/product.entity';

@Injectable({})
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createProduct(productDetails: ProductDto) {
    console.log(productDetails);
    const product = this.productRepository.create(productDetails);
    await this.productRepository.save(product);
  }
}
