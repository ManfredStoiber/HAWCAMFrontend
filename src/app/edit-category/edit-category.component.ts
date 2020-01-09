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


  // membervariables
  private jsonCatAttributes: JSON = null;
  objCatAttributes: any = null;
  form: FormGroup;

  constructor(private fb: FormBuilder, private dataService: DataService,  private restService: RESTService ) {

  }

  // ngOnInit - gets the category details in json format
  // initialisation of membervariables and errorhandling
  // alerts user if necessary, else calls this.initialiseScreenWithJSON()
  ngOnInit() {

    this.jsonCatAttributes = this.dataService.getJsonCatAttributes();
    this.objCatAttributes = this.jsonCatAttributes;
    console.log("Category:");
    console.log(this.jsonCatAttributes);

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
  // creates a form and add formcontrol
  // creates a form group and push further form controls
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

  // get contentDesciptions getter for the array within the formgroup
  // @return this.form.get('contentDescriptions')   array within the formgroup
  get contentDescriptions(){
    return <FormArray> this.form.get('contentDescriptions');
  };

  // addNewDetail - adds new form controls to the formgroup (contentDesciptions)
  // add a new attribute by clicking on the button
  // results in adding some new form controls in the array
  addNewDetail(){
    let ctrl = <FormArray>this.form.get('contentDescriptions');
    ctrl.push(this.fb.group({
      hiddenIndex: [''],
      detailName: ['', Validators.required],
      detailType: ['textfield', Validators.required],
      mandatory: [1, Validators.required]

    }))

  }

  // deleteContentDescription - deletes onClick a category detail respectively a formgroup in the array
  // remove the chosen form controls from the array at the index i
  // @input   i    the chosen row to delete
  deleteContentDescription(i: number){
    let ctrl = <FormArray>this.form.get('contentDescriptions');
    ctrl.removeAt(i);
  }

  // onSubmit - gets the form value and sends it to backend and handles errors
  // gets the form values
  // adds a hidden index for a better handling in the backend
  // parses the input into a JSON format
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
          .subscribe( (jsonResponse :JSON) => {
                this.checkResponse(jsonResponse);
              }
           );

    } catch ( exception ) {
      console.log("jsonSerializedForm is not valid");
    }

  }

  // checkResponse - error handling for PUT-request
  // alerts user if necessary, else sends response to dataService and changes components
  // @input   jsonResponse    response from backend service in JSON format
  checkResponse( jsonResponse: JSON ) {

     let objResponse = jsonResponse;
     console.log("editCategory checkResponse:");
     console.log(objResponse);

     if( objResponse ) {
       if ('Fehler' in objResponse) {
         alert("Kategorie konnte nicht geändert werden");
       }
       else {
           alert("Kategorie erfolgreich geändert");
       }
     } else {
         alert("Kategorie konnte nicht geändert werden");
     }
   }

}
