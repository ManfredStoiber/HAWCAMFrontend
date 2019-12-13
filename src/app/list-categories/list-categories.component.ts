import { Component, OnInit } from '@angular/core';
import { RESTService } from '../rest.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {

  json: JSON = null;

  // declaration of the RESTService - dependency injection
  constructor( private restService: RESTService ) { }

  ngOnInit() {
  //  this.json = this.restService.callRESTService().subscribe( test => { console.log("Test:" + test) } );

    this.restService.callRESTService().subscribe( data =>
      { this.json = data;
      console.log("DATA    " + JSON.stringify(data) )
    } );

    console.log("this is onInit");
    console.log(this.json);

  }




}
