import { TestBed } from '@angular/core/testing';

import { MotoService } from './moto.service';

describe('MotoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MotoService = TestBed.get(MotoService);
    expect(service).toBeTruthy();
  });
});
