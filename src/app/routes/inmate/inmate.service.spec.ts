import { TestBed } from '@angular/core/testing';
import { InmateService } from './inmate.service';
import { HttpClientModule } from '@angular/common/http';

describe('LoginService', () => {
  let service: InmateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(InmateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
