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
  UseFilters,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateCatsDTO } from './interface';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../filter/http-exception.filter';
import { CatchEverythingFilter } from '../filter/catch-everything.filter';
// import { ForbiddenException } from '../exception/forbidden.exception';

@Controller('cats')
@UseFilters(new HttpExceptionFilter())
@UseFilters(CatchEverythingFilter)
export class CatsController {
  // 私有属性可以直接使用ts的parameter-properties特性,避免多次声明
  // https://www.cnblogs.com/Wayou/p/typescript_parameter_property.html
  constructor(private catService: CatsService) {}
  // 相当于
  // private catService: CatsService;
  // constructor() {}

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
  // @UseFilters(new HttpExceptionFilter())
  @UseFilters(HttpExceptionFilter)
  findOne(@Param('id', ParseIntPipe) id: string): string {
    if (id === '114514') {
      // throw new HttpException('id is notfound', HttpStatus.FORBIDDEN);
      /* 
      响应:{
          "statusCode": 403,
          "message": "Forbidden"
        }
      如果要自定义响应体,需要HttpException的构造函数第一个参数传递一个对象
      
      */
      throw new HttpException(
        {
          message: 'id is notfound',
          code: HttpStatus.FORBIDDEN,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: new Error(),
          description: 'id is notfound',
        },
      );
      /* 
      响应体为:
    { 
      message:"id is notfound",
      code:403  
    }
      
      */
      // throw new ForbiddenException();
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
