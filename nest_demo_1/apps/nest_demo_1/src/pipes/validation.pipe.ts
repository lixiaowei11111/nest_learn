import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ZodSchema } from 'zod';
@Injectable()
/**
 * validation pipe 即验证管道要么返回未更改的值，要么抛出异常。
 * As noted earlier, a validation pipe either returns the value unchanged or throws an exception.
 * https://docs.nestjs.com/pipes#object-schema-validation
 */
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  // transform(value: unknown, metadata: ArgumentMetadata) {
  //   console.log('[debug] metadata', metadata);
  //   return value;
  //   // validation pipe 即验证管道要么返回未更改的值，要么抛出异常。
  // }
  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      console.log('[debug] metadata', metadata);
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      console.log('[debug] ZodValidationPipe error:', error);
      throw new BadRequestException('Validation failed');
    }
  }
}

// import {
//   PipeTransform,
//   Injectable,
//   ArgumentMetadata,
//   BadRequestException,
// } from '@nestjs/common';

// import { validate } from 'class-validator';
// import { plainToInstance } from 'class-transformer';

// @Injectable()
// export class ValidationPipe implements PipeTransform<any> {
//   async transform(value: any, { metatype }: ArgumentMetadata) {
//     if (!metatype || !this.toValidate(metatype)) {
//       return value;
//     }
//     const object = plainToInstance(metatype, value);
//     const errors = await validate(object);
//     if (errors.length > 0) {
//       throw new BadRequestException('Validation failed');
//     }
//     return value;
//   }

//   private toValidate(metatype: Function): boolean {
//     const types: Function[] = [String, Boolean, Number, Array, Object];
//     return !types.includes(metatype);
//   }
// }
