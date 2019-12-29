import { Component, OnInit } from '@angular/core';
import { RESTService } from '../rest.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-choose-category',
  templateUrl: './choose-category.component.html',
  styleUrls: ['./choose-category.component.css']
})
export class ChooseCategoryComponent implements OnInit {

  jsonData : any = null;

  constructor( private restService: RESTService, private router: Router, private dataService: DataService ) {
  }

  ngOnInit() {

    this.restService.getFromRESTService("listCategories")
       .subscribe( (jsonResponse :JSON) => {
             this.jsonData = jsonResponse;
             console.log("Response from listCategories:");
             console.log(this.jsonData);
           }
        );

  }


  sendChosenCat( strChosenCat:string ) {

    let strTemp: string = null;
    strTemp = '{"strChosenCatName":"' + strChosenCat + '"}';
    let jsonSerializedForm: JSON = null;

    try {

      jsonSerializedForm = JSON.parse(strTemp);
      console.log("jsonSerializedForm is valid");
      console.log(jsonSerializedForm);

      this.restService.putToRESTService("listAttributesForCategory", jsonSerializedForm)
          .subscribe( (jsonResponse :JSON) => {
                console.log(jsonResponse);
                this.dataService.setJsonAttributes(jsonResponse);
                this.router.navigate(["/createObject"]);
              }
           );

    } catch ( exception ) {
      console.log("jsonSerializedForm is not valid");
    }

  } // end of sendChosenCat


}
