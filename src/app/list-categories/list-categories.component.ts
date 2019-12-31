import { Component, OnInit } from '@angular/core';
import { RESTService } from '../rest.service';
import { HttpEvent } from '@angular/common/http';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {

  jsonData : any = null;
  response : Response;


  // declaration of the RESTService - dependency injection
  constructor( private restService: RESTService) { }

  ngOnInit() {
    console.log("--onInit");

    this.restService.getFromRESTService("listCategories")
       .subscribe( (JSONresponse :JSON) => {
             this.jsonData = JSONresponse;
             console.log(this.jsonData);
           }
        );
  }

}
