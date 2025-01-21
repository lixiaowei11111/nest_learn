import {
  Controller,
  Get,
  Post,
  HttpCode,
  Header,
  Redirect,
  Query,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateCatsDTO } from './interface';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  // 私有属性可以直接使用ts的parameter-properties特性,避免多次声明
  // https://www.cnblogs.com/Wayou/p/typescript_parameter_property.html
  constructor(private catService: CatsService) {}

  @Get('find')
  async findAll(): Promise<CreateCatsDTO[]> {
    return this.catService.findAll();
  }
  // @Get('find/:id')
  // findOne(@Param() params: { id: string }): string {
  //   console.log('[debug] params', params, params.id);
  //   return `This action returns a  #${params.id} cat`;
  // }
  // id
  @Get('find/:id')
  findOne(@Param('id') id: string): string {
    if (id === '114514') {
      throw new HttpException('id is notfound', HttpStatus.FORBIDDEN);
    }
    console.log('[debug] params', id);
    return `This action returns a  #${id} cat`;
  }

  @Post('create')
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  create(@Body() createCatsDTO: CreateCatsDTO): string {
    this.catService.create(createCatsDTO);
    return `This action adds a new cat with name is ${createCatsDTO.name}`;
  }

  @Get('redirect')
  @Redirect('https://nestjs.com', 301)
  redirect() {}

  @Get('docs')
  @Redirect('https://127.0.0.1:3000/cats', 302)
  async getDocs(@Query('version') version: string) {
    if (version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
}
