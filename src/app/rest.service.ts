import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class RESTService {

  private nPort: number = 5001;
  private strUrl: string = "http://snirps.ddns.net:" + this.nPort + "/api/v1.0/";

  private headerDict : any;


    // declaration of the HttpClient - dependency injection
  constructor( private http: HttpClient ) {

    this.headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

  }


  public getFromRESTService( strPathending: string ) : Observable<JSON> {

    console.log("--getFromRESTService");
    let httpOptions = {
      headers: new HttpHeaders(this.headerDict),
    };

    return this.http.get<JSON>( this.strUrl + strPathending, httpOptions )
        .pipe( catchError( this.handleError))
    ;

  }


  public putToRESTService( strPathending: string, JSONdata: JSON) {

    console.log("--putToRESTService");
    let httpOptions = {
      headers: new HttpHeaders(this.headerDict),
    };

    return this.http.put<JSON>( this.strUrl + strPathending, JSONdata, httpOptions )
        .pipe( catchError( this.handleError))
    ;
  }


  handleError( error: any) {

    let strErrorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      error = `Error: ${error.message}`;
    } else {
      // server-side error
      strErrorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(strErrorMessage);
    return throwError(strErrorMessage);

  }














/*

  // processing response
  private processingResponse( strResponse: string ) : JSON {

    console.log("--processingResponse");

    let valid : boolean = this.validateResponse(strResponse);
    if( valid == true ){
          console.log("yes yes yes");
          console.log("mach was");
          return this.json;
    } else {
        console.log("abbruch");
        this.json = null;
        return JSON.parse( '{"Fehler":"fehlerhaftes JSON aus Backend"}' )
    }

  }


  // method for validating the response
  // check whether the returned JSON is valid
  private validateResponse( strResponse: string ) : boolean {

    console.log("--validateResponse");
    console.log("------------");
    console.log("Response wäre:");
    console.log(strResponse);
    console.log("------------");

    try {
        // kann er nicht wegen dem vorangestellten Test
        // das ist schon ein JSON - kann er nicht nochmal da rein hauen
    // this.json = JSON.parse( 'Test {"name":"bob","age":34}' );

      // kann er
      this.json = JSON.parse( '[ {"id": 1, "name": "Leanne Graham", "username": "Bret" } ]' );
      // this.json = JSON.parse( strResponse );

      console.log("--validateResponse nach JSON.parse");
      console.log(this.json)
      return true;

    } catch ( exception ) {
      console.log("no no no");
      console.log("errorroutine here");
    }
    return false;
  }

*/

}
