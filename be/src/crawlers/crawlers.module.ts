import { Module } from '@nestjs/common';
import { CrawlersService } from './crawlers.service';
import { CrawlersController } from './crawlers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Crawler, CrawlerChema } from './entities/crawler.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Crawler.name, schema: CrawlerChema }]),
  ],
  controllers: [CrawlersController],
  providers: [CrawlersService],
})
export class CrawlersModule {}
