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

  // membervariables
  private jsonCatAttributes: JSON = null;
  objCatAttributes: any = null;
  form: FormGroup;


  // declaration of the FormBuilder, DataService, Router - dependency injection
  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router ) {

  }


  // ngOnInit - used for initialisation of membervariables
  // usage of dataService to load jsonCatAttributes
  // error handling of jsonCatAttributes
  // alerts user if necessary, else calls this.initialiseScreenWithJSON()
  ngOnInit() {

    // initialisation of membervariables
    this.jsonCatAttributes = this.dataService.getJsonCatAttributes();
    this.objCatAttributes = this.jsonCatAttributes;

    // errorhandling
    // when error occurs, alert for user and deny loading of html
    if( this.objCatAttributes ) {
      if ('Fehler' in this.objCatAttributes) {
        this.objCatAttributes = null;
        alert("Fehler bei der Dateiübertragung, bitte Seite erneut mit Auswahl laden");
        console.log("this.objCatAttributes contains errorJSON - site needs to be loaded again");
      }
      else {
        this.initialiseScreenWithJSON();
      }
    } else {
      alert("Fehler bei der Dateiübertragung, bitte Seite erneut mit Auswahl laden");
      console.log("this.objCatAttributes is null");
    }

  }

  // initialiseScreenWithJSON - adds form controls to every input
  // adds a form control
  // adds further controls depending on the given json object
  initialiseScreenWithJSON(): void {

    // create a form group, at first only with the input for the objects name
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

  // to be deleted: returntype ?

  // getter for contentDescriptions array
  // @return    this.form.get('contentDescriptions')     containts the variable amount of category details
  get contentDescriptions():FormArray{
    return <FormArray> this.form.get('contentDescriptions');
  };


  // openEditCategoryComponent - onClick of Button "Bearbeiten!"
  // opens the EditCategoryComponents
  openEditCategoryComponent(): void {
    this.router.navigate(["/editCategory"]);
  }


}
