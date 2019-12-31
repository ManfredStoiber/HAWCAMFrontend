import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.css']
})
export class ShowCategoryComponent implements OnInit {

  private jsonAttributes: JSON = null;
  objAttributes: any = null;
  form: FormGroup;

  constructor(private fb: FormBuilder, private dataService: DataService ) {

  }

  ngOnInit() {

    this.jsonAttributes = this.dataService.getJsonAttributes();

    this.objAttributes = this.jsonAttributes;
    console.log("json dummy:");
    console.log(this.jsonAttributes);

    this.initialiseScreenWithJSON();

  }


  initialiseScreenWithJSON() {

    // create a form group, at first only with the input for the objects name
    // "''" is the initial value of the input
    this.form = this.fb.group({
        objCatName: ['wie komm ich hier an den kat namen?', Validators.required],
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


}
