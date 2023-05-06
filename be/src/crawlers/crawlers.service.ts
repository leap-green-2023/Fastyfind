import { Injectable } from '@nestjs/common';
import { CreateCrawlerDto } from './dto/create-crawler.dto';
import { UpdateCrawlerDto } from './dto/update-crawler.dto';
import { Crawler } from './entities/crawler.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';

@Injectable()
export class CrawlersService {
  constructor(
    @InjectModel(Crawler.name) private crawlerModel: Model<Crawler>,
  ) {}
  async create(createCrawlerDto: CreateCrawlerDto) {
    const response = await axios.post(
      'https://back.emonos.mn/api/site/branch/list',
    );
    const datas = await response.data;

    try {
      datas.data.map((data) =>
        new this.crawlerModel({
          ...data,
          location: {
            type: 'Point',
            coordinates: [data.longtitude, data.latitude],
          },
        }).save(),
      );
    } catch (error) {
      console.log('data hadgalhad aldaa garlaa...', error);
    }

    return 'This action adds a new crawler';
  }

  findAll() {
    return this.crawlerModel.find({});
  }
  findNearest(lat, long) {
    console.log('lat long hevlegdlee:', [parseFloat(long), parseFloat(lat)]);
    return this.crawlerModel.findOne({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(long), parseFloat(lat)],
          },
          $minDistance: 1000,
          $maxDistance: 5000,
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} crawler`;
  }

  update(id: number, updateCrawlerDto: UpdateCrawlerDto) {
    return `This action updates a #${id} crawler`;
  }

  remove(id: number) {
    return `This action removes a #${id} crawler`;
  }
}
