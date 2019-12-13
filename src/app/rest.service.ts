import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})

export class RESTService {

  json: JSON = null;

  // declaration of the HttpClient - dependency injection
  constructor( private http: HttpClient ) { }


  // method for sending REST
    // returnwert ???
  public callRESTService() {

    // geht aber kommt nicht in component an
    // let observer = this.http.get<string>('https://api.github.com/users/DanGitHub123');
   // observer.subscribe( (strResponse: string) => this.processingResponse(strResponse) );

    // let observer = this.http.get<JSON>('https://api.github.com/users/DanGitHub123');
    // observer.subscribe( (response: JSON) => console.log(response) );


    return this.http.get<JSON>('https://api.github.com/users/DanGitHub123');

    // return this.json;
  }

  // processing response
  private processingResponse( strResponse: string ) {

    let valid : boolean = this.validateResponse(strResponse);
    if( valid == true ){
          console.log("yes yes yes");
          console.log("mach was");
    } else {
        console.log("abbruch");
        this.json = null;
    }

  }

  // method for validating the response
  // check whether the returned JSON is valid
  private validateResponse( strResponse: string ) : boolean {

    try {
        // kann er nicht wegen dem vorangestellten Test
    // this.json = JSON.parse( 'Test {"name":"bob","age":34}' );

      // kann er
      this.json = JSON.parse( '{"name":"bob","age":34}' );

    // this.json = JSON.parse( strResponse );
      console.log("validateResponse");
      console.log(this.json)
      return true;

    } catch ( exception ) {
      console.log("no no no");
      console.log("errorroutine here");
    }
    return false;
  }



}
