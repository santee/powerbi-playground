import { TestBed, inject } from '@angular/core/testing';

import { PowerbiService } from './powerbi-service.service';

describe('PowerbiServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PowerbiService]
    });
  });

  it('should be created', inject([PowerbiService], (service: PowerbiService) => {
    expect(service).toBeTruthy();
  }));
});
