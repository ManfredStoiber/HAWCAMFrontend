import { Component, OnInit } from '@angular/core';
import { RESTService } from '../rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {

  jsonData : any = null;
  response : Response;


  // declaration of the RESTService - dependency injection
  constructor( private restService: RESTService, private router: Router ) { }

  ngOnInit() {

    this.restService.getFromRESTService("listCategories")
       .subscribe( (JSONresponse :JSON) => {
             this.jsonData = JSONresponse;
             console.log(this.jsonData);
           }
        );
  }

  testmethod( strCategoryName: string) {
    console.log(strCategoryName);

    this.router.navigate(['/showCategory']);

  }

}
