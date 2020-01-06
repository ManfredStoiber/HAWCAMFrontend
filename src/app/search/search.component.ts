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
        searchString: ['', Validators.required]
      });
  }


  ngOnInit() {


  }



  onSubmit() {

      this.initialiseScreenWithJSON();

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
    // hier mit leeren array ein "erfolglose Suche" simulieren
    //let strTemp:string = '{"objects": [ ] }';
    //let strTemp:string = '{"objects": [ {"name": "R231"}, {"name": "E123"}, {"name": "F123"} ] }';

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
