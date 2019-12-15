import { Component, OnInit } from '@angular/core';
import { RESTService } from '../rest.service';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {

  data: Object;

  dataJSON : any = null;

  dataArray : any[];

  response : Response;

  // declaration of the RESTService - dependency injection
  constructor( private restService: RESTService) { }

  ngOnInit() {

    console.log("--onInit");

    // this.restService.callRESTService("listCategories")
    //   .subscribe( (response :JSON) => {
    //         this.dataJSON = response;
    //         console.log(this.dataJSON);
    //   });

    try {
      // this.dataJSON = JSON.parse(' {	"categories": { "category1": {"name":"Raum","count":3}, "category2": {"name":"Buch","count":14 } } }' );
      // this.dataJSON = JSON.parse(' { "categories": [ {"name":"Raum","count":3},  {"name":"Buch","count":14 }  ] }' );
      this.dataJSON = JSON.parse(' { "categories": [ {"name":"Raum","count":3},  {"name":"Buch","count":14 },  {"name":"VR-Brille","count":2},{"name":"Raum","count":3},  {"name":"Buch","count":14 },  {"name":"VR-Brille","count":2}  ] }' );
      // this.dataJSON = JSON.parse(' { "categories": [ ] }' );

      console.log("yes yes yes");
      console.log(this.dataJSON);
    } catch ( exception ) {
      console.log("no no no");
      console.log("errorroutine here");
    }

  }


}
