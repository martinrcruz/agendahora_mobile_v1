import { TestBed } from '@angular/core/testing';

import { MisVehiculosService } from './mis-vehiculos.service';

describe('MisVehiculosService', () => {
  let service: MisVehiculosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MisVehiculosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
