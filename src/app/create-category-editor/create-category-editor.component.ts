import { Component, OnInit, ContentChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

import { RESTService } from '../rest.service';


@Component({
  selector: 'app-create-category-editor',
  templateUrl: './create-category-editor.component.html',
  styleUrls: ['./create-category-editor.component.css']
})
export class CreateCategoryEditorComponent implements OnInit {

  // membervariables
  form: FormGroup;

  // create a form group with the category name and an empty array for
  // addable attributes
  constructor(private fb: FormBuilder, private restService: RESTService) {
    this.form = this.fb.group({
        objCatName: ['', Validators.required],
        contentDescriptions: this.fb.array([])
      });
  }

  ngOnInit() {

  }

  // onSubmit - sends the form value to the backend
  // gets the form data
  // creates a hidden index field for a better handling in the backend
  // parses the input into a JSON format
  // put it to REST service
  onSubmit() {

    // get the form data as an object
    let formObj = this.form.getRawValue();

    // hidden index begins with 1 and not with 0 (required from the backend guys)
    for(var i=0;i<formObj.contentDescriptions.length;i++){
      formObj.contentDescriptions[i].hiddenIndex = (i+1);
    }


    let nMandatory: number = 0;

    // create the json object with the name of the createCategory
    // and the added attributes
    let strTemp: string = ' { "name":"' + formObj.objCatName + '", "contentDescriptions": { ';


    if( formObj.contentDescriptions.length > 0 ) {      //  Attribute vorhanden
      for (let i=0; i < formObj.contentDescriptions.length; i++) {
         strTemp += '"' + formObj.contentDescriptions[i].hiddenIndex + '": {';
         strTemp += '"name":"' + formObj.contentDescriptions[i].detailName + '",';
         strTemp += '"typ":"' + formObj.contentDescriptions[i].detailType + '",';
         if( formObj.contentDescriptions[i].optionalOrMandatory === "mandatory") {
           nMandatory = 1;
         } else if ( formObj.contentDescriptions[i].optionalOrMandatory === "optional") {
           nMandatory = 0;
         }
         strTemp += '"optionalOrMandatory":"' + nMandatory + '",';
         strTemp += '"deleted":"0"}';
         //console.log('i: ' + i + ' | length: ' + formObj.contentDescription.length);
         if (i < formObj.contentDescriptions.length-1) {
           strTemp += ',';
         }
      }
    }
    strTemp += '},"deleted":"0"}';

    console.log("strTemp:");
    console.log(strTemp);


    // send it to the backend
    let jsonSerializedForm: JSON = null;

    try {
      jsonSerializedForm = JSON.parse(strTemp);
      console.log("jsonSerializedForm is valid");
      console.log(jsonSerializedForm);

      this.restService.putToRESTService("createCategory", jsonSerializedForm)
          .subscribe( (jsonResponse :JSON) => {
                this.checkResponse(jsonResponse);
              }
           );

    } catch ( exception ) {
      console.log("jsonSerializedForm is not valid");
      alert("Kategorie konnte nicht gespeichert werden");
    }

  }

  // checkResponse - error handling for PUT-request
  // alerts user if necessary, else sends response to dataService and changes components
  // @input   jsonResponse    response from backend service in JSON format
  checkResponse( jsonResponse: JSON ) {

    let objResponse = jsonResponse;
    console.log("createCategory checkResponse:");
    console.log(objResponse);

    if( objResponse ) {
      if ('Fehler' in objResponse) {
        alert("Kategorie konnte nicht gespeichert werden");
      }
      else {
          alert("Kategorie erfolgreich erstellt");
      }
    } else {
        alert("Kategorie konnte nicht gespeichert werden");
    }
  }




  // get contentDesciptions getter for the array within the formgroup
  // @return this.form.get('contentDescriptions')   array within the formgroup
  get contentDescriptions(){
    return <FormArray> this.form.get('contentDescriptions');
  };


  // addNewDetail - allows the user onClick to add a new Detail
  // gets the formarray 'contentDesciptions'
  // add a new formgroup to the contentDescriptions array
  addNewDetail(){
    let ctrl = <FormArray>this.form.get('contentDescriptions');
    ctrl.push(this.fb.group({
      hiddenIndex: [''],
      detailName: ['', Validators.required],
      detailType: ['textfield', Validators.required],
      optionalOrMandatory: ['optional', Validators.required]

    }))

  }

  // deleteContentDescription
  // remove the chosen form controls from the array
  // gets the contentDesciptions array
  // removes the formgroup
  // @input    i       the row respectively the chosen index in the formgroup contentDesciptions
  deleteContentDescription(i: number){
    let ctrl = <FormArray>this.form.get('contentDescriptions');
    ctrl.removeAt(i);
  }


}
