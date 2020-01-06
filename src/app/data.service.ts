import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  // JSON for parameter passing from choseCategory to CreateObject
  // value are the attributes from a category necessary to create an object
  private jsonAttributes: JSON = null;
  private jsonObjectDetails: JSON = null;

  constructor() { }


// DataService for chooseCategory, showCategory, editCategory
  public getJsonAttributes(): JSON {
    if ( this.jsonAttributes != null ) {
      return this.jsonAttributes;
    }
    return JSON.parse('{"Fehler":"JSON ist null"}');
  }

  public setJsonAttributes( jsonAttributes: JSON) {
    this.jsonAttributes = jsonAttributes;
  }


// DataService for showObject
  public getObjectDetails(): JSON {
    if ( this.jsonObjectDetails != null ) {
      return this.jsonObjectDetails;
    }
    return JSON.parse('{"Fehler":"JSON ist null"}');
  }

  public setObjectDetails( jsonObjectDetails: JSON) {
    this.jsonObjectDetails = jsonObjectDetails;
  }


}
