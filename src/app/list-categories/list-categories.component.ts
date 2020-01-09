import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { RESTService } from '../rest.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {

  // membervariables
  jsonAllCategories : any = null;


  // constructor
  // declaration of the RESTService, DataService, Router - dependency injection
  constructor( private restService: RESTService, private dataService: DataService, private router: Router ) { }


  // ngOnInit -  gets called after constructor
  // used for initialisation of jsonAllCategories with the usage of GET-request to backend service
  ngOnInit() {
    this.restService.getFromRESTService("listCategories")
       .subscribe( (jsonResponse :JSON) => {
             this.checkResponseGET(jsonResponse);
           }
        );
  }


  // listAttributesForCategory - onClick from user on a shown category
  // parses the input into a JSON format
  // sends request for categoryattributes to backend service
  // waits for asynchronous response and calls checkResponsePUT after receiving the response
  // @input   strChosenCatName    the clicked categoryname
  listAttributesForCategory( strChosenCatName: string): void {

    let strTemp: string = null;
    strTemp = '{"catName":"' + "'" + strChosenCatName + "'"+ '"}';
    let jsonSerializedForm: JSON = null;

    try {

      jsonSerializedForm = JSON.parse(strTemp);
      console.log(jsonSerializedForm);

      this.restService.putToRESTService("listAttributesForCategory", jsonSerializedForm)
          .subscribe( (jsonResponse :JSON) => {
               this.checkResponsePUT(jsonResponse);
             }
          );

    } catch ( exception ) {
      console.log("jsonSerializedForm is not valid");
    }

  }


  // checkResponseGET - error handling for GET-request
  // alerts user if necessary, else sets the membervariable
  // @input   jsonResponse    response from backend service in JSON format
  checkResponseGET( jsonResponse: JSON ): void {

    let objResponse = jsonResponse;
    console.log("listCategories checkResponse:");
    console.log(objResponse);

    if( objResponse ) {
      if ('Fehler' in objResponse) {
        alert("Kategorien konnten nicht geladen werden");
      }
      else {
        this.jsonAllCategories = jsonResponse;
      }
    } else {
        alert("Kategorien konnten nicht geladen werden");
    }
  }


  // checkResponsePUT - error handling for PUT-request
  // alerts user if necessary, else sends response to dataService and changes components
  // @input   jsonResponse    response from backend service in JSON format
  checkResponsePUT( jsonResponse: JSON ): void {

    let objResponse = jsonResponse;
    console.log("listAttributesForCategory checkResponse:");
    console.log(objResponse);

    if( objResponse ) {
      if ('Fehler' in objResponse) {
        alert("Kategorie konnte nicht geladen werden");
      }
      else {
        this.dataService.setJsonCatAttributes(jsonResponse);
        this.router.navigate(["/showCategory"]);
      }
    } else {
        alert("Kategorie konnte nicht geladen werden");
    }
  }


}
