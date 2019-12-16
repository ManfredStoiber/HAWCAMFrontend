import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class RESTService {

  private json: JSON = null;
  private url: string = "localhost:5000/api/v1.0/";

  // declaration of the HttpClient - dependency injection
  constructor( private http: HttpClient ) { }


  public callRESTService( pathending: string ) {

    console.log("--callRESTService");
    return this.http.get<JSON>( this.url + pathending );
    // return this.http.get("https://api.github.com/users/DanGitHub123")
  }



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



}
