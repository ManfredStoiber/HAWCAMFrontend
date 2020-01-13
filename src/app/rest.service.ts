import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class RESTService {

  // membervariables
  private nPort: number = 5001;
  strUrl: string = "http://snirps.ddns.net:" + this.nPort + "/api/v1.0/";

  private headerDict : any;


  // declaration of the HttpClient - dependency injection
  // declaration of the headerDict
  constructor( private http: HttpClient ) {

    this.headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

  }


  // getFromRESTService - method to send a GET-request to Backend
  // @param   strPathending   adress ending of the backendservice that will be called
  // @return                  response from backendservice parsed to a JSON
  public getFromRESTService( strPathending: string ) : Observable<JSON> {

    console.log("--getFromRESTService");
    let httpOptions = {
      headers: new HttpHeaders(this.headerDict),
    };

    return this.http.get<JSON>( this.strUrl + strPathending, httpOptions )
        .pipe( catchError( this.handleError))
    ;
  }


  // putToRESTService - method to send a PUT-request to Backend
  // @param   strPathending   adress ending of the backendservice that will be called
  // @return                  response from backendservice parsed to a JSON
  public putToRESTService( strPathending: string, jsonData: JSON) : Observable<JSON> {

    console.log("--putToRESTService");
    let httpOptions = {
      headers: new HttpHeaders(this.headerDict),
    };

    return this.http.put<JSON>( this.strUrl + strPathending, jsonData, httpOptions )
        .pipe( catchError( this.handleError))
    ;
  }


  // handleError - method to handle errors: ParseErrors, HttpErrors...
  // @param   error   error from calling backendservice
  // @return          errormessage
  public handleError( error: any) {

    let strErrorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      error = `Error: ${error.message}`;
    } else {
      // server-side error
      strErrorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert("Fehlgeschlagen, Info siehe Console");
    console.log(strErrorMessage);
    return throwError(strErrorMessage);

  }




}
