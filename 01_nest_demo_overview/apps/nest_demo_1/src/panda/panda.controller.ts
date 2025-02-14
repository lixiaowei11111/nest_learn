import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpStatus,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { PandaService } from './panda.service';
import { CreatePandaDto, createPandaSchema } from './dto/create-panda.dto';
import { UpdatePandaDto } from './dto/update-panda.dto';
import { ZodValidationPipe } from '../pipes/validation.pipe';
import { RolesGuard } from '../guards/roles.guard';
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('panda')
@UseGuards(RolesGuard)
export class PandaController {
  constructor(private readonly pandaService: PandaService) {}

  @Post()
  @UseGuards(new AuthGuard())
  @UsePipes(new ZodValidationPipe(createPandaSchema))
  create(@Body() createPandaDto: CreatePandaDto) {
    return this.pandaService.create(createPandaDto);
  }

  @Get()
  @Roles(['admin'])
  findAll() {
    return this.pandaService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.pandaService.findOne(+id);
  // }

  // @Get(':uuid')
  // findOne(
  //   @Param(
  //     'uuid',
  //     new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
  //   )
  //   id: number,
  // ) {
  //   return this.pandaService.findOne(+id);
  // }

  @Get()
  findOne(
    @Query(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.pandaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePandaDto: UpdatePandaDto) {
    return this.pandaService.update(+id, updatePandaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pandaService.remove(+id);
  }
}
