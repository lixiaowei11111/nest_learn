import { Injectable } from '@nestjs/common';

@Injectable()
export class MonorepoAdditionService {
  getHello(): string {
    return 'Hello World!';
  }
}
