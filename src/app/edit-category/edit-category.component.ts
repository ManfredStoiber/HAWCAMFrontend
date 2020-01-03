import { Component, OnInit } from '@angular/core';
import { FormArray, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from '../data.service';
import { RESTService } from '../rest.service';


@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  private jsonAttributes: JSON = null;
  objAttributes: any = null;
  form: FormGroup;

  constructor(private fb: FormBuilder, private dataService: DataService,  private restService: RESTService ) {

  }

  ngOnInit() {

    this.jsonAttributes = this.dataService.getJsonAttributes();

    this.objAttributes = this.jsonAttributes;
    console.log("Category:");
    console.log(this.jsonAttributes);

    this.initialiseScreenWithJSON();

  }


  initialiseScreenWithJSON() {

    // create a form group, at first only with the input for the objects name
    // "''" is the initial value of the input
    this.form = this.fb.group({
                                                                                  // objCatName: [this.objAttributes.name , Validators.required],
        objCatName: ['kommentier mich ein', Validators.required],
        contentDescriptions: this.fb.array([])
      });


    // create further form controls depending on the given json
    // if required make the inputs mandatory
    for ( let i=0; i < this.objAttributes.attributes.length; i++ ) {
        let ctrl = <FormArray>this.form.get('contentDescriptions');

        ctrl.push(this.fb.group({
          hiddenIndex: [i],
          detailName: [this.objAttributes.attributes[i].name, Validators.required],
          detailType: [this.objAttributes.attributes[i].typ, Validators.required],
          mandatory: [this.objAttributes.attributes[i].mandatory, Validators.required]

        }));

      }
    }


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


  onSubmit() {
    alert("Kategorie wurde geändert!");

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
         strTemp += '"mandatory":"' + nMandatory + '",';
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

      this.restService.putToRESTService("editCategory", jsonSerializedForm)
          .subscribe( (JSONresponse :JSON) => {
                console.log(JSONresponse);
              }
           );

    } catch ( exception ) {
      console.log("jsonSerializedForm is not valid");
    }

  }


}
