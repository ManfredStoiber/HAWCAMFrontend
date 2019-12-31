import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DataService {

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
