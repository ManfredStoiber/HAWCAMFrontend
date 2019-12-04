import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-category-editor',
  templateUrl: './create-category-editor.component.html',
  styleUrls: ['./create-category-editor.component.css']
})
export class CreateCategoryEditorComponent implements OnInit {


    objFormControl = this.fb.group({
      objCatName: ['', Validators.required],
    });



  constructor(private fb: FormBuilder) { }

  onSubmit() {
    alert("Kategorie wurde angelegt!");
  }

  ngOnInit() {
  }

}
