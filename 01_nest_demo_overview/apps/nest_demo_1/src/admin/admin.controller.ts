import { Get, Controller } from '@nestjs/common';

@Controller({ host: 'admin.example.com' })
// Since Fastify lacks support for nested routers, when using sub-domain routing, the (default) Express adapter should be used instead.
export class AdminController {
  @Get()
  index(): string {
    return 'Admin page';
  }
}
