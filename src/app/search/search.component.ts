import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RESTService } from '../rest.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  form: FormGroup;
  private jsonSearchResult: JSON = null;
  objSearchResult: any = null;

  constructor(private fb: FormBuilder, private restService: RESTService) { }

  ngOnInit() {

    this.initialiseScreenWithJSON();
  }



  onSubmit() {

      // get the form data as an object
      let formObj = this.form.getRawValue();

      let jsonSearch: JSON = formObj;

      this.restService.putToRESTService("search", jsonSearch)
          .subscribe( (jsonResponse :JSON) => {
            this.checkResponse(jsonResponse);
            this.initialiseScreenWithJSON();
          }
        );


    }


  checkResponse( jsonResponse: JSON ) {

    let objResponse = jsonResponse;
    console.log("Search checkResponse:");
    console.log(objResponse);

    if( objResponse ) {
      if ('Fehler' in objResponse) {
        alert("Suche konnte nicht durchgeführt werden");
      }
      else {
          this.jsonSearchResult = jsonResponse;
      }
    } else {
          alert("Suche konnte nicht durchgeführt werden");
    }
  }


  initialiseScreenWithJSON() {

    // ergebnisse auflisten ?
    // überhaupt nötig?
    // reicht auflisten über html ? ja oder

    let strTemp:string = '{"objects": [ {"name": "R231"}, {"name": "E123"}, {"name": "F123"} ] }';
    let jsonSerializedForm: JSON = null;

    try {
      jsonSerializedForm = JSON.parse(strTemp);
      console.log("jsonSerializedForm is valid");
      console.log(jsonSerializedForm);

      this.objSearchResult = jsonSerializedForm;

    } catch ( exception ) {
      console.log("jsonSerializedForm is not valid");
    }


  }



}
