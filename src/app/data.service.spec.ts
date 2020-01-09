import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });

  it('should have working getter and setter', () => {
    let service = TestBed.get(DataService);
    service.setJsonAttributes(null);
    expect(service.getJsonAttributes()).toEqual({"Fehler": "JSON ist null"});
    service.setJsonAttributes({"Name": "Testattribute"});
    expect(service.getJsonAttributes()).toEqual({"Name": "Testattribute"});
  })
});
