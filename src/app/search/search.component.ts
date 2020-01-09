import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RESTService } from '../rest.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  // membervariables
  form: FormGroup;
  private jsonSearchResult: JSON = null;
  objSearchResult: any = null;


  // declaration of the FormBuilder, DataService, Router - dependency injection
  // create a form group with the category name and an empty array for
  // addable attributes
  constructor(private fb: FormBuilder, private restService: RESTService, private dataService: DataService, private router: Router) {
    this.form = this.fb.group({
        search: ['', Validators.required]
      });
  }


  // ngOnInit - unused but necessary by angular
  ngOnInit() {

  }


  // onSubmit - submitfunction of the form
  // reads values out of form
  // sends searchstring to backend service
  onSubmit(): void {

      // get the form data as an object
      let formObj = this.form.getRawValue();

      let jsonSearch: JSON = formObj;
      console.log("Input jsonSearch");
      console.log(jsonSearch);

      this.restService.putToRESTService("search", jsonSearch)
          .subscribe( (jsonResponse :JSON) => {
            this.checkResponseSearch(jsonResponse);
          }
        );

    }


  // checkResponseSearch - error handling for PUT-request
  // alerts user if necessary, else initialises membervariables
  // @input   jsonResponse    response from backend service in JSON format
  checkResponseSearch( jsonResponse: JSON ): void {

    let objResponse = jsonResponse;
    console.log("Search checkResponse:");
    console.log(objResponse);

    if( objResponse ) {
      if ('Fehler' in objResponse) {
        alert("Suche konnte nicht durchgeführt werden");
      }
      else {
          this.jsonSearchResult = jsonResponse;
          this.objSearchResult = this.jsonSearchResult;
      }
    } else {
          alert("Suche konnte nicht durchgeführt werden");
    }
  }


  // showObject - onClick from user on a shown object
  // parses the input into a JSON format
  // sends request for objectdetails to backend service
  // waits for asynchronous response and calls checkResponsePUT after receiving the response
  // @input   strChosenObjectName    the clicked objectname
  showObject( strChosenObjectName: string): void {

    let strTemp: string = null;
    strTemp = '{"objName":"' + "'" + strChosenObjectName + "'"+ '"}';
    let jsonSerializedForm: JSON = null;

    try {

      jsonSerializedForm = JSON.parse(strTemp);
      console.log(jsonSerializedForm);

      this.restService.putToRESTService("listObjectDetails", jsonSerializedForm)
          .subscribe( (jsonResponse :JSON) => {
               this.checkResponsePUT(jsonResponse, "Object");
             }
          );

    } catch ( exception ) {
      alert("Fehler bei Objektauswahl");
      console.log("jsonSerializedForm is not valid");
    }
  }


  // showCategory - onClick from user on a shown category
  // parses the input into a JSON format
  // sends request for categoryattributes to backend service
  // waits for asynchronous response and calls checkResponsePUT after receiving the response
  // @input   strChosenCatName    the clicked categoryname
  showCategory( strChosenCatName: string): void {

    let strTemp: string = null;
    strTemp = '{"catName":"' + "'" + strChosenCatName + "'"+ '"}';
    let jsonSerializedForm: JSON = null;

    try {

      jsonSerializedForm = JSON.parse(strTemp);
      console.log(jsonSerializedForm);

      this.restService.putToRESTService("listAttributesForCategory", jsonSerializedForm)
          .subscribe( (jsonResponse :JSON) => {
               this.checkResponsePUT(jsonResponse, "Category");
             }
          );

    } catch ( exception ) {
      alert("Fehler bei Kategorieauswahl");
      console.log("jsonSerializedForm is not valid");
    }
  }


  // checkResponsePUT - error handling for PUT-request
  // alerts user if necessary, else sends response to dataService and changes components
  // @input   jsonResponse    response from backend service in JSON format
  // @input   strCaller       caller of the checkResponsePUT-method
  checkResponsePUT( jsonResponse: JSON, strCaller: string ): void {

    let objResponse = jsonResponse;
    console.log("Show" + strCaller + " checkResponse:");
    console.log(objResponse);

    if( objResponse ) {
      if ('Fehler' in objResponse) {
        alert( strCaller + " konnte nicht geladen werden");
      }
      else {
        if( strCaller === "Object" ) {
          this.dataService.setObjectDetails(jsonResponse);
          this.router.navigate(["/showObject"]);
        } else if ( strCaller === "Category" ){
          this.dataService.setJsonCatAttributes(jsonResponse);
          this.router.navigate(["/showCategory"]);
        } else {
          alert("Unbekanntes Objekt konnte nicht geladen werden");
        }
      }
    } else {
        alert(strCaller + " konnte nicht geladen werden");
    }
  }

}
