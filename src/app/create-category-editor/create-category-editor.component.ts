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


  form: FormGroup;

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

    let formObj = this.form.getRawValue();

    for(var i=0;i<formObj.contentDescriptions.length;i++){
      formObj.contentDescriptions[i].hiddenIndex = (i+1);

    }
    let nMandatory: number = 0;
    let strTemp: string = ' { "name":"' + formObj.objCatName + '", "contentDescriptions": { ';

    if( formObj.contentDescriptions.length > 1 ) {      //  Attribute vorhanden
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

    let JSONserializedForm: JSON = null;
    try {
      JSONserializedForm = JSON.parse(strTemp);
      console.log("JSONserializedForm is valid");
      console.log(JSONserializedForm);

      this.restService.putToRESTService("createCategory", JSONserializedForm)
          .subscribe( (JSONresponse :JSON) => {
                console.log(JSONresponse);
              }
           );

    } catch ( exception ) {
      console.log("JSONserializedForm is not valid");
    }


  }

  get contentDescriptions(){
    return <FormArray> this.form.get('contentDescriptions');
  };


  addNewDetail(){
    let ctrl = <FormArray>this.form.get('contentDescriptions');
    ctrl.push(this.fb.group({
      hiddenIndex: [''],
      detailName: ['', Validators.required],
      detailType: ['textfield', Validators.required],
      optionalOrMandatory: ['optional', Validators.required]

    }))

  }

  deleteContentDescription(i: number){
    let ctrl = <FormArray>this.form.get('contentDescriptions');
    ctrl.removeAt(i);
  }


}
