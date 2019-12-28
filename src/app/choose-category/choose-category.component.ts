import { Component, OnInit } from '@angular/core';
import { RESTService } from '../rest.service';
import { HttpEvent } from '@angular/common/http';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-choose-category',
  templateUrl: './choose-category.component.html',
  styleUrls: ['./choose-category.component.css']
})
export class ChooseCategoryComponent implements OnInit {

  JSONdata : any = null;
  response : Response;
  form: FormGroup;

  constructor(private fb:FormBuilder, private restService: RESTService) {


  }

  ngOnInit() {



    console.log("--onInit");

    this.restService.getFromRESTService("listCategories")
       .subscribe( (JSONresponse :JSON) => {
             this.JSONdata = JSONresponse;
             console.log(this.JSONdata);
           }
        );

  }

  // try {
    // this.dataJSON = JSON.parse(' {	"categories": { "category1": {"name":"Raum","count":3}, "category2": {"name":"Buch","count":14 } } }' );
    // this.dataJSON = JSON.parse(' { "categories": [ {"name":"Raum","count":3},  {"name":"Buch","count":14 }  ] }' );
    // this.dataJSON = JSON.parse(' { "categories": [ {"name":"Raum","count":3},  {"name":"Buch","count":14 },  {"name":"VR-Brille","count":2},{"name":"Raum","count":3},  {"name":"Buch","count":14 },  {"name":"VR-Brille","count":2}  ] }' );
    // this.dataJSON = JSON.parse(' { "categories": [ ] }' );

  //   console.log("Parsing worked");
  //   console.log(this.dataJSON);
  // } catch ( exception ) {
  //   console.log("errorroutine here");
  // }

  sendChosenCat(cat:string){
    alert("chosen:"+cat);

    try {
      let strTemp:string;

      strTemp = '{"catName":"'+cat+'"};'

      let JSONserializedForm: JSON = null;
      JSONserializedForm = JSON.parse(strTemp);
      console.log("JSONserializedForm is valid");
      console.log(JSONserializedForm);

      this.restService.putToRESTService("choseCategory", JSONserializedForm)
          .subscribe( (JSONresponse :JSON) => {
                console.log(JSONresponse);
              }
           );

    } catch ( exception ) {
      console.log("JSONserializedForm is not valid");
    }


  }


}
