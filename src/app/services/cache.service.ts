import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache = new Map<string, any>();

  constructor() {}

  set(req: HttpRequest<any>, data: any): void {
    this.cache.set(req.urlWithParams, data);
  }

  get(req: HttpRequest<any>): any {
    return this.cache.get(req.urlWithParams);
  }

  clear(): void {
    this.cache.clear();
  }
}
