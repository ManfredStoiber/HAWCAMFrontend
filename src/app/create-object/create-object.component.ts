import { Component, OnInit, ContentChild } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { RESTService } from '../rest.service';
import { DataService } from '../data.service';



@Component({
  selector: 'app-create-object',
  templateUrl: './create-object.component.html',
  styleUrls: ['./create-object.component.css']
})
export class CreateObjectComponent implements OnInit {

  detailsObj:any;
  form: FormGroup;

  private jsonAttributes: JSON = null;
  objAttributes: any = null;

  constructor(private fb: FormBuilder, private restService: RESTService, private dataService: DataService ) {

    // create a form group, at first only with the input for the objects name
    // "''" is the initial value of the input
    this.form = this.fb.group({
        objObjName: ['', Validators.required]
      });

  }


  ngOnInit() {

    this.jsonAttributes = this.dataService.getJsonAttributes();
    console.log("CreateObject --onInit")
    console.log(this.jsonAttributes);

    this.objAttributes = this.jsonAttributes;

    this.initialiseScreenWithJSON();

  }

  initialiseScreenWithJSON() {

    // create further form controls depending on the given json
    // if required make the inputs mandatory
    for ( let i=0; i < this.objAttributes.attributes.length; i++ ) {
      if ( this.objAttributes.attributes[i].mandatory == "1" ) {
        if ( this.objAttributes.attributes[i].typ == "dateAndTime" ) {
          console.log("in_if_name:" + this.objAttributes.attributes[i].name);
          this.form.addControl(this.objAttributes.attributes[i].name+"-Date", new FormControl('', Validators.required));
          this.form.addControl(this.objAttributes.attributes[i].name+"-Clock", new FormControl('', Validators.required));
        } else {
          this.form.addControl(this.objAttributes.attributes[i].name, new FormControl('', Validators.required));
        }
      } else if ( this.objAttributes.attributes[i].mandatory == "0" ) {

        if ( this.objAttributes.attributes[i].typ == "dateAndTime" ) {
          this.form.addControl(this.objAttributes.attributes[i].name+"-Date", new FormControl(''));
          this.form.addControl(this.objAttributes.attributes[i].name+"-Clock", new FormControl(''));
        } else {
          this.form.addControl(this.objAttributes.attributes[i].name, new FormControl(''));
        }
      }
    }

  }


  // send the form data to the backend
  onSubmit() {
    alert("Objekt wurde angelegt!");

    // get the form data as an object
    let formObj = this.form.getRawValue();

    let jsonObject: JSON = formObj;
    console.log(jsonObject);

    this.restService.putToRESTService("createObject", jsonObject)
        .subscribe( (jsonResponse :JSON) => {
             console.log("createObject subscribe");
             console.log(jsonResponse);
           }
        );
  }
}
