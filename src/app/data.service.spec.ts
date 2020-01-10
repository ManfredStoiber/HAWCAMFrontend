import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });

  it('should have working getter and setter for jsonCatAttributes', () => {
    let service = TestBed.get(DataService);
    service.setJsonCatAttributes(null);
    expect(service.getJsonCatAttributes()).toEqual({"Fehler": "JSON ist null"});
    service.setJsonCatAttributes({"Name": "Testattribute"});
    expect(service.getJsonCatAttributes()).toEqual({"Name": "Testattribute"});
  })

  it('should have working getter and setter for jsonObjectDetails', () => {
    let service = TestBed.get(DataService);
    service.setObjectDetails(null);
    expect(service.getObjectDetails()).toEqual({"Fehler": "JSON ist null"});
    service.setObjectDetails({"Name": "Testattribute"});
    expect(service.getObjectDetails()).toEqual({"Name": "Testattribute"});
  })
  
});
