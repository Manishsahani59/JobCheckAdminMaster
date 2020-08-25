import { TestBed } from '@angular/core/testing';

import { DistrictServicsService } from './district-servics.service';

describe('DistrictServicsService', () => {
  let service: DistrictServicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistrictServicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
