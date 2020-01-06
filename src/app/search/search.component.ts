import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  // create a form group with the category name and an empty array for
  // addable attributes
  constructor(private fb: FormBuilder, private restService: RESTService) {
    this.form = this.fb.group({
        search: ['', Validators.required]
      });
  }


  ngOnInit() {

  }


  onSubmit() {

      // get the form data as an object
      let formObj = this.form.getRawValue();

      let jsonSearch: JSON = formObj;
      console.log("Input jsonSearch");
      console.log(jsonSearch);

      this.restService.putToRESTService("search", jsonSearch)
          .subscribe( (jsonResponse :JSON) => {
            this.checkResponse(jsonResponse);
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
          this.objSearchResult = this.jsonSearchResult;
      }
    } else {
          alert("Suche konnte nicht durchgeführt werden");
    }
  }

      // to be deleted
  testmethod() {

      // mit kategorien und mit objekten
    let strTemp:string ='{"categories":[{"name": "Raum"},{"name": "Raumtisch"},{"name": "Raumwand"}],"objects": [ {"name": "Raum1", "cat":"Raum"},{"name": "Raum2", "cat":"Raum"},{"name": "Raumtisch2", "cat":"Raumtisch"},{"name": "Raumschiff", "cat":"NASA"}]}';

    // ohne kategorien
    //let strTemp:string ='{"categories":[],"objects": [ {"name": "Raum1", "cat":"Raum"},{"name": "Raum2", "cat":"Raum"},{"name": "Raumtisch2", "cat":"Raumtisch"},{"name": "Raumschiff", "cat":"NASA"}]}';

    //ohne objekte
    //let strTemp:string ='{"categories":[{"name": "Raum"},{"name": "Raumtisch"},{"name": "Raumwand"}],"objects": [ ]}';

    //ohne kategorien und ohne objekte
    //let strTemp:string ='{"categories":[],"objects": []}';


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
