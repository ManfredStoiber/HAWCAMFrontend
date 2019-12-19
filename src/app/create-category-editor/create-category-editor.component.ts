import { Component, OnInit, ContentChild } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
//import { Http } from '@angular/http';

@Component({
  selector: 'app-create-category-editor',
  templateUrl: './create-category-editor.component.html',
  styleUrls: ['./create-category-editor.component.css']
})
export class CreateCategoryEditorComponent implements OnInit {



  contentSelected: any;


  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
        objCatName: ['', Validators.required],
        contentDescriptions: this.fb.array([])
    });
  }

  onSubmit() {
    alert("Kategorie wurde angelegt!");

    let formObj = this.form.getRawValue();



    for(var i=0;i<formObj.contentDescriptions.length;i++){
      formObj.contentDescriptions[i].hiddenIndex = (i+1);

    }

    let temp: string = " { 'name':'" + formObj.objCatName + "', 'contentDescriptions': { ";
    for (let i=0; i < formObj.contentDescriptions.length; i++){
	     temp += "'" + formObj.contentDescriptions[i].hiddenIndex + "': {"
	     temp += "'name':'" + formObj.contentDescriptions[i].detailName + "',"
	     temp += "'typ':'" + formObj.contentDescriptions[i].detailType + "',"
	     temp += "'optionalOrMandatory':'" + formObj.contentDescriptions[i].optionalOrMandatory + ",";
       temp += "'deleted':'0'}";
       //console.log("i: " + i + " | length: " + formObj.contentDescription.length);
       if (i < formObj.contentDescriptions.length-1){
         temp += ",";
       }else{
         temp += "},'deleted':'0'}";
       }
    }

    console.log("formObj:");
    console.log(formObj);
    console.log("temp:");
    console.log(temp);

    let serializedForm = JSON.stringify(formObj);


    //console.log(serializedForm);

    //this.http.post("www.domain.com/api", serializedForm)
    //        .subscribe(
    //            data => console.log("success!", data),
    //            error => console.error("couldn't post because", error)
    //        );
  }

      get contentDescriptions() {
        return this.form.get('contentDescriptions') as FormArray;
      };


      ngOnInit(){
        this.form.patchValue({
          contentDescriptions: this.contentSelected.descriptionArray
        });
      }

      addNewDetail(){
        let ctrl = <FormArray>this.form.controls.contentDescriptions;
        ctrl.push(this.fb.group({
          hiddenIndex: [''],
          detailName: ['', Validators.required],
          detailType: ['textfield', Validators.required],
          optionalOrMandatory: ['optional', Validators.required]

        }))



      }

      deleteContentDescription(i){
        this.contentDescriptions.removeAt(i);
      }
}
