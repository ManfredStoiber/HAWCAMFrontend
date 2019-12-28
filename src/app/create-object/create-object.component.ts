import { Component, OnInit, ContentChild } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { RESTService } from '../rest.service';



@Component({
  selector: 'app-create-object',
  templateUrl: './create-object.component.html',
  styleUrls: ['./create-object.component.css']
})
export class CreateObjectComponent implements OnInit {

  detailsObj:any;

  form: FormGroup;

  constructor(private fb: FormBuilder, private restService: RESTService) {


    this.detailsObj = {
     details:[
       {
         name: "Notiz",
         type: "textfield",
         optionalOrMandatory: "optional",
         value: ""
       },
       {
         name: "Garantie bis",
         type: "date",
         optionalOrMandatory: "optional",
         value: ""
       },
       {
         name: "Nächster Wartungstermin",
         type: "dateAndTime",
         optionalOrMandatory: "optional",
         value: ""
       },
       {
         name: "Verantwortlicher",
         type: "textfield",
         optionalOrMandatory: "optional",
         value: ""
       },
       {
         name: "Anschaffungspreis",
         type: "number",
         optionalOrMandatory: "optional",
         value: ""
       }

     ]
   };

    this.form = this.fb.group({
        objCatName: ['', Validators.required]
      });

      for(let i=0;i<this.detailsObj.details.length;i++){
        if(this.detailsObj.details[i].optionalOrMandatory=="Pflichtfeld"){
          if(this.detailsObj.details[i].type=="dateAndTime"){
            this.form.addControl(this.detailsObj.details[i].name+"-Date", new FormControl('', Validators.required));
            this.form.addControl(this.detailsObj.details[i].name+"-Clock", new FormControl('', Validators.required));
          }else{
            this.form.addControl(this.detailsObj.details[i].name, new FormControl('', Validators.required));
          }
        }else if(this.detailsObj.details[i].optionalOrMandatory=="optional"){

          if(this.detailsObj.details[i].type=="dateAndTime"){
            this.form.addControl(this.detailsObj.details[i].name+"-Date", new FormControl(''));
            this.form.addControl(this.detailsObj.details[i].name+"-Clock", new FormControl(''));
          }else{
            this.form.addControl(this.detailsObj.details[i].name, new FormControl(''));
          }
        }
      }
  }

  ngOnInit() {

  }

  onSubmit() {
    alert("Objekt wurde angelegt!");


    let formObj = this.form.getRawValue();

    console.log(formObj);

//    let strTemp:string;

  //  strTemp += '{';

  //  for(let i=0;i<this.detailsObj.details.length;i++){
  //    strTemp += '"'+this.detailsObj.details[i].name+'":'+'"'+;
  //  }
  }

}
