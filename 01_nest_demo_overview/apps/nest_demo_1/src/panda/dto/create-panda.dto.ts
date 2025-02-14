import { z } from 'zod';

export const createPandaSchema = z
  .object({
    name: z.string(),
    age: z.number(),
    breed: z.string(),
  })
  .required();

export type CreatePandaDto = z.infer<typeof createPandaSchema>;

// 或者使用class-validator: https://github.com/typestack/class-validator,而不需要单独创建一个validator class
// 配合class-transformer: https://github.com/typestack/class-transformer
// 上述库的作者也写了一个routing-controllers 用来作为替代nestjs的一个轻量级技术方案
// import { IsString, IsInt } from 'class-validator';

// export class CreatePandaDto {
//   @IsString()
//   name: string;

//   @IsInt()
//   age: number;

//   @IsString()
//   breed: string;
// }
