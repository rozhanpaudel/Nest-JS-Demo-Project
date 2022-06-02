import { IsNotEmpty } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  productName: string;

  @IsNotEmpty()
  productCategory: string;

  @IsNotEmpty()
  outOfStock: string;

  //   @IsNotEmpty()
  //   image: string;

  @IsNotEmpty()
  userId: string;
}
