// import { PartialType } from '@nestjs/mapped-types';
import { z } from 'zod';
import { createPandaSchema } from './create-panda.dto';

// export class UpdatePandaDto extends PartialType(panda:CreatePandaDto) {}

export const updatePandaSchema = createPandaSchema.partial();

export type UpdatePandaDto = z.infer<typeof updatePandaSchema>;
