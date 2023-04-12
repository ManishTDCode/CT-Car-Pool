import { TestBed } from '@angular/core/testing';

import { ReqInterceptorInterceptor } from './req-interceptor.interceptor';

describe('ReqInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ReqInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ReqInterceptorInterceptor = TestBed.inject(ReqInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
