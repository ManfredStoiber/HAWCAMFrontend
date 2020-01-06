import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.css']
})
export class ShowCategoryComponent implements OnInit {

  private jsonCatAttributes: JSON = null;
  objCatAttributes: any = null;
  form: FormGroup;

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router ) {

  }

  // initialisation of membervariables and errorhandling
  ngOnInit() {

    // initialisation of membervariables
    this.jsonCatAttributes = this.dataService.getJsonAttributes();
    this.objCatAttributes = this.jsonCatAttributes;

    // errorhandling
    // when error occurs, alert for user and deny loading of html
    if( this.objCatAttributes ) {
      if ('Fehler' in this.objCatAttributes) {
        this.objCatAttributes = null;
        alert("Fehler bei der Dateiübertragung, bitte Seite erneut mit Auswahl laden");
      }
      else {
        this.initialiseScreenWithJSON();
      }
    }

  }


  initialiseScreenWithJSON() {

    // create a form group, at first only with the input for the objects name
    // "''" is the initial value of the input
    this.form = this.fb.group({
        objCatName: [this.objCatAttributes.name , Validators.required],
        contentDescriptions: this.fb.array([])
      });



    // create further form controls depending on the given json
    // if required make the inputs mandatory
    for ( let i=0; i < this.objCatAttributes.attributes.length; i++ ) {
          let ctrl = <FormArray>this.form.get('contentDescriptions');

            ctrl.push(this.fb.group({
              hiddenIndex: [i],
              detailName: [this.objCatAttributes.attributes[i].name, Validators.required],
              detailType: [this.objCatAttributes.attributes[i].typ, Validators.required],
              mandatory: [this.objCatAttributes.attributes[i].mandatory, Validators.required]

            }));
    }

  }


  get contentDescriptions(){
    return <FormArray> this.form.get('contentDescriptions');
  };


  // onClick from Button edit
  // opens the EditCategoryComponents
  openEditCategoryComponent() {
    this.router.navigate(["/editCategory"]);
  }


}
