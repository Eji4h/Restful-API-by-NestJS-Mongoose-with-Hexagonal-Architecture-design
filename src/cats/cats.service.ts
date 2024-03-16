import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cat.schema';
import { Model } from 'mongoose';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  create(cat: Cat): Promise<Cat> {
    const createdCat = new this.catModel(cat);
    return createdCat.save();
  }

  findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }
}
