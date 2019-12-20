import { Component, OnInit } from '@angular/core';
import { RESTService } from '../rest.service';
import { HttpEvent } from '@angular/common/http';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {

  JSONdata : any = null;
  response : Response;


  // declaration of the RESTService - dependency injection
  constructor( private restService: RESTService) { }

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


}
