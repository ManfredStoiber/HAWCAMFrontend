import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  // JSON for parameter passing from choseCategory to CreateObject
  // value are the attributes from a category necessary to create an object
  private jsonAttributes: JSON = null;


  constructor() { }

  public getJsonAttributes(): JSON {
    if ( this.jsonAttributes != null ) {
      return this.jsonAttributes;
    }
    return JSON.parse('{"Fehler":"JSON ist null"}');
  }

  public setJsonAttributes( jsonAttributes: JSON) {
    this.jsonAttributes = jsonAttributes;
  }


}
