import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { mongoUri } from './configs/mongo.config';

@Module({
  imports: [MongooseModule.forRoot(mongoUri), CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
