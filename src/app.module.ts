import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { mongoUri } from './configs/mongo.config';
import { ProductModule } from './products/product.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(mongoUri),
    AuthModule,
    ProductModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
