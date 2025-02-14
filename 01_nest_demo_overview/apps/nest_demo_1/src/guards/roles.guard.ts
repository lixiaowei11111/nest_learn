// guard执行在所有中间件(middleware)之后,在拦截器(interceptor)和管道(pipe)之前
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Roles } from '../decorators/roles.decorator';
import { Reflector } from '@nestjs/core';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(
      '[debug roles.guard.ts] context.switchToHttp().getRequest()',
      context.switchToHttp().getRequest(),
    );
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('[debug] user', user);
    // return matchRoles(roles, user.roles);
    return true;
  }
}
