import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  protected logger: Logger;
  constructor() {
    this.logger = new Logger('Logging');
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    this.logger.log(`Before Logging: ${context.getClass().name}`);

    const req = context.switchToHttp().getRequest();
    const now = Date.now();
    const method = req.method;
    const url = req.url;

    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `${method} ${url} [After...] ${Date.now() - now}ms`,
          `LoggingInterceptor/${context.getClass().name}`,
        );
      }),
    );
  }
}
