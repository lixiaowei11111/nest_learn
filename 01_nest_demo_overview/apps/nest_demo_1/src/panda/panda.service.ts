import { Injectable } from '@nestjs/common';
import { CreatePandaDto } from './dto/create-panda.dto';
import { UpdatePandaDto } from './dto/update-panda.dto';

@Injectable()
export class PandaService {
  create(createPandaDto: CreatePandaDto) {
    return 'This action adds a new panda';
  }

  findAll() {
    return `This action returns all panda`;
  }

  findOne(id: number) {
    return `This action returns a #${id} panda`;
  }

  update(id: number, updatePandaDto: UpdatePandaDto) {
    return `This action updates a #${id} panda`;
  }

  remove(id: number) {
    return `This action removes a #${id} panda`;
  }
}
