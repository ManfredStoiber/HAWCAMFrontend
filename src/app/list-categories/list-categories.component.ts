import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { RESTService } from '../rest.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {

  jsonData : any = null;
  response : Response;


  // declaration of the RESTService - dependency injection
  constructor( private restService: RESTService, private dataService: DataService, private router: Router ) { }

  ngOnInit() {

    this.restService.getFromRESTService("listCategories")
       .subscribe( (JSONresponse :JSON) => {
             this.jsonData = JSONresponse;
             console.log(this.jsonData);
           }
        );
  }

  navigateToChosenCategory( strChosenCatName: string) {

    let strTemp: string = null;
    strTemp = '{"strChosenCatName":"' + strChosenCatName + '"}';
    let jsonSerializedForm: JSON = null;

    try {

      jsonSerializedForm = JSON.parse(strTemp);
      console.log("jsonSerializedForm is valid");
      console.log(jsonSerializedForm);

      this.restService.putToRESTService("listAttributesForCategory", jsonSerializedForm)
          .subscribe( (jsonResponse :JSON) => {
               console.log(jsonResponse);
               this.dataService.setJsonAttributes(jsonResponse);
               this.router.navigate(["/showCategory"]);
             }
          );

    } catch ( exception ) {
     console.log("jsonSerializedForm is not valid");
   }


  }

}
