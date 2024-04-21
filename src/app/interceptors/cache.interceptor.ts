import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheService } from './cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor(private cacheService: CacheService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // If request method is not GET, do not cache
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    // Check if response is cached
    const cachedResponse = this.cacheService.get(req);
    if (cachedResponse) {
      return cachedResponse;
    }

    // If not cached, make the request and cache the response
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cacheService.set(req, event);
        }
      })
    );
  }
}
