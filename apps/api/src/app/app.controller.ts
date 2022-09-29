import { Controller, Get, Post, Req, Res, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post()
  async create(@Req() request, @Res() response) {
    try {
      await this.appService.fileupload(request, response);
    } catch (error) {
      return response
        .status(500)
        .json(`Failed to upload image file: ${error.message}`);
    }
  }

  @Get(':key')
  async getImage(@Req() request, @Res() response, @Param() params) {
    try {
      await this.appService.getImage(request, response, params);
    } catch (error) {
      return response
        .status(500)
        .json(`Failed to upload image file: ${error.message}`);
    }
  }
}
