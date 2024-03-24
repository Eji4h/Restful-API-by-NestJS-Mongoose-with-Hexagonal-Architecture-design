import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { mongoUri } from './configs/mongo.config';
import { ProductModule } from './products/product.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [MongooseModule.forRoot(mongoUri), ProductModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
