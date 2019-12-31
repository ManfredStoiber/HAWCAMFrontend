import { Component, OnInit, ContentChild } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

import { RESTService } from '../rest.service';


@Component({
  selector: 'app-create-category-editor',
  templateUrl: './create-category-editor.component.html',
  styleUrls: ['./create-category-editor.component.css']
})
export class CreateCategoryEditorComponent implements OnInit {


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

  onSubmit() {
    alert("Kategorie wurde angelegt!");

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
          .subscribe( (JSONresponse :JSON) => {
                console.log(JSONresponse);
              }
           );

    } catch ( exception ) {
      console.log("jsonSerializedForm is not valid");
    }


  }

  // getter for the content descriptions array
  get contentDescriptions(){
    return <FormArray> this.form.get('contentDescriptions');
  };


  // add a new attribute by clicking on the button
  // results in adding some new form controls in the array
  addNewDetail(){
    let ctrl = <FormArray>this.form.get('contentDescriptions');
    ctrl.push(this.fb.group({
      hiddenIndex: [''],
      detailName: ['', Validators.required],
      detailType: ['textfield', Validators.required],
      optionalOrMandatory: ['optional', Validators.required]

    }))

  }

  // remove the chosen form controls from the array
  deleteContentDescription(i: number){
    let ctrl = <FormArray>this.form.get('contentDescriptions');
    ctrl.removeAt(i);
  }


}
