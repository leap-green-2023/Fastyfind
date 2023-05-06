import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CrawlersModule } from './crawlers/crawlers.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://employee:employee@cluster0.kha92pb.mongodb.net/Fastify',
    ),
    UsersModule,
    ProductsModule,
    CategoriesModule,
    CrawlersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
