import { TestBed } from '@angular/core/testing';

import { HeaderData } from './headerData.model';

describe('HeaderData', () => {

  let headerData: HeaderData;

  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => {
    headerData = new HeaderData(null, null, null);
  })

  it('should be created', () => {
    headerData = new HeaderData(null, null, null);
    expect(headerData).toBeTruthy();
  });

  it('should have working getter and setter', () => {

    expect(headerData.getTitle()).toEqual(null);
    expect(headerData.getPath()).toEqual(null);
    expect(headerData.getMessage()).toEqual(null);

    headerData.setTitle("Testtitle");
    headerData.setPath("Testpath");
    headerData.setMessage("Testmessage");
    expect(headerData.getTitle()).toEqual("Testtitle");
    expect(headerData.getPath()).toEqual("Testpath");
    expect(headerData.getMessage()).toEqual("Testmessage");
  })
});
