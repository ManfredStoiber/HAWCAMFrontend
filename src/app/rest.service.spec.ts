import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RESTService } from './rest.service';

describe('RESTService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: RESTService = TestBed.get(RESTService);
    expect(service).toBeTruthy();
  });
});
