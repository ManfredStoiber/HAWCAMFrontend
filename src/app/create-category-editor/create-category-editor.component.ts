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

    //@ContentChild('loading') testEl: any;

    //objFormControl = this.fb.group({
    //  objCatName: ['', Validators.required],
    //});

    contentSelected: any;



  constructor(private fb: FormBuilder) { }

  onSubmit() {
    alert("Kategorie wurde angelegt!");
  }


  //public delDetail(e,i){
//    e.srcElement.parentNode.parentNode.removeChild(e.srcElement.parentNode);
//  }


  //public addDetail(e,i){
  //  var nameDetail = prompt("Wie soll das Detail heißen?");

    //var newRow = document.getElementsByClassName("detailrow")[0].cloneNode(true);
    //newRow.firstChild.firstChild.textContent=nameDetail+":";

//    document.getElementsByClassName("submitrow")[0].parentNode.insertBefore(newRow, document.getElementsByClassName("submitrow")[0]);

  //}

  //objFormControl = this.fb.group({
  //  objCatName: ['', Validators.required],
  //});

      form = this.fb.group({
        objCatName: ['', Validators.required],
        contentDescriptions: this.fb.array([

        ])

      });


      get contentDescriptions() {
        return this.form.get('contentDescriptions') as FormArray;
      };


      ngOnInit(){
        this.form.patchValue({
          contentDescriptions: this.contentSelected.descriptionArray
        });

      }

      addNewDetail(){
         this.contentDescriptions.push(this.fb.control(''));
//detailName: ['', [Validators.required]],
          //detailType: ['', [Validators.required]],
          //optionalOrMandatory: ['', [Validators.required]],
      }

      deleteContentDescription(i){
        this.contentDescriptions.removeAt(i);
      }


}
