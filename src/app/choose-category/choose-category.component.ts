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

  // membervariables
  jsonData : any = null;

  constructor( private restService: RESTService, private router: Router, private dataService: DataService ) {
  }

  // ngOnInit - gets a list of all existing categories in json format
  ngOnInit() {

    this.restService.getFromRESTService("listCategories")
       .subscribe( (jsonResponse :JSON) => {
             this.jsonData = jsonResponse;
             console.log("Response from listCategories:");
             console.log(this.jsonData);
           }
        );

  }

  // sendChosenCat - onClick from user on a shown category button -
  // parses the input into a JSON format
  // sends request for category to backend service
  // waits for asynchronous response and calls checkResponsePUT after receiving the response
  // @input   strChosenCat    the string represented on the clicked category button
  sendChosenCat( strChosenCat:string ) {

    let strTemp: string = null;

    //create string for json and send it
    strTemp = '{"catName":"' + "'" + strChosenCat + "'" + '"}';
    let jsonSerializedForm: JSON = null;

    try {

      jsonSerializedForm = JSON.parse(strTemp);
      console.log("jsonSerializedForm is valid");
      console.log(jsonSerializedForm);

      this.restService.putToRESTService("listAttributesForCategory", jsonSerializedForm)
          .subscribe( (jsonResponse :JSON) => {
                console.log(jsonResponse);
                this.dataService.setJsonCatAttributes(jsonResponse);
                this.router.navigate(["/createObject"]);
              }
           );

    } catch ( exception ) {
      console.log("jsonSerializedForm is not valid");
    }

  } // end of sendChosenCat


}
