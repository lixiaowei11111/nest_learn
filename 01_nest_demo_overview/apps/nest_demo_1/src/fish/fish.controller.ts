import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { FishService } from './fish.service';
import { CreateFishDto } from './dto/create-fish.dto';
import { UpdateFishDto } from './dto/update-fish.dto';
// import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { CacheInterceptor } from '../interceptors/cache.interceptor';
import { User } from '../decorators/user.decorator';

@Controller('fish')
// @UseInterceptors(LoggingInterceptor)
export class FishController {
  constructor(private readonly fishService: FishService) {}

  @UseInterceptors(TransformInterceptor)
  @Post()
  create(@Body() createFishDto: CreateFishDto) {
    return this.fishService.create(createFishDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  findAll() {
    return this.fishService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    // 自定义Param Decorator使用pipe时,必须把validateCustomDecorators设置为true
    @User(new ValidationPipe({ validateCustomDecorators: true })) user: string,
  ) {
    console.log('[debug] ', user);
    return this.fishService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFishDto: UpdateFishDto) {
    return this.fishService.update(+id, updateFishDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fishService.remove(+id);
  }
}
