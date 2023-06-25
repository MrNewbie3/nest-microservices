import { Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async all() {
    return this.productService.all();
  }

  @Post(':id/like')
  async like(@Param('id') id: number) {
    const product = await this.productService.findOne(id);
    this.productService.update(id, {
      likes: product.likes + 1,
    });
  }

  @EventPattern('product_created')
  async productCreated(data: any) {
    await this.productService.create({
      id: data.id,
      title: data.title,
      image: data.image,
      likes: data.likes,
    });
  }

  @EventPattern('product_update')
  async updateProduct(data: any) {
    await this.productService.update(data.id, {
      id: data.id,
      title: data.title,
      image: data.image,
      likes: data.likes,
    });
  }
  @EventPattern('product_deleted')
  async deleteProduct(id: number) {
    await this.productService.delete(id);
  }
}
