import { Component, OnInit, ContentChild } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

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
          detailName: ['', Validators.required],
          detailType: ['textfield', Validators.required],
          optionalOrMandatory: ['optional', Validators.required]

        }))

      }

      deleteContentDescription(i){
        this.contentDescriptions.removeAt(i);
      }
}
