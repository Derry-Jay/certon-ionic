import { TestBed } from '@angular/core/testing';

import { MynavService } from './mynav.service';

describe('MynavService', () => {
  let service: MynavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MynavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
