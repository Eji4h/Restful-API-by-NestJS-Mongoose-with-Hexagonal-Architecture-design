import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoUri } from './configs/mongo.config';
import { ProductModule } from './products/product.module';

@Module({
  imports: [MongooseModule.forRoot(mongoUri), ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
