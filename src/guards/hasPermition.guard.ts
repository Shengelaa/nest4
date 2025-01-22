import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class HasPermitionGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const password = request.headers['password'];
    if (!password || password !== 'vardisferivardi') {
      throw new UnauthorizedException('Permittion denied');
    }
    return true;
  }
}
