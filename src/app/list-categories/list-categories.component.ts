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

  // declaration of the RESTService - dependency injection
  constructor( private restService: RESTService) { }

  ngOnInit() {

    console.log("--onInit");

    this.restService.callRESTService("users")
      .subscribe( (response :Response) => {
            this.data = response;
            console.log(this.data);
      });



    // data: Object;
    // this.http.request('http://api.themoviedb.org/3/movie/top_rated?api_key=API-KEY')
    //   .subscribe((res: Response) => {
    //     this.data = res.json().results;
    //
    //   });
    //

    // try {
    //   this.dataJSON = JSON.parse(' {	"categories": { "category1": {"name":"Raum","count":3}, "category2": {"name":"Buch","count":14 } } }' );
    //   console.log("yes yes yes");
    //   console.log(this.dataJSON);
    // } catch ( exception ) {
    //   console.log("no no no");
    //   console.log("errorroutine here");
    // }

    // this.dataArray = Array.of(this.dataJSON);
    // console.log(this.dataArray);

  }




}
