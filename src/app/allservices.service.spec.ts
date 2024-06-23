import { TestBed, inject } from '@angular/core/testing';

import { AllservicesService } from './allservices.service';

describe('AllservicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllservicesService]
    });
  });

  it('should be created', inject([AllservicesService], (service: AllservicesService) => {
    expect(service).toBeTruthy();
  }));
});
