import { Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './cat.schema';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create() {
    const cat = new Cat();
    cat.name = 'Cat';
    cat.age = 5;
    cat.breed = 'Persian';
    return this.catsService.create(cat);
  }

  @Get()
  getAll() {
    return this.catsService.findAll();
  }
}
