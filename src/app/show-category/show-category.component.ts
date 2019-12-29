import { Component, OnInit } from '@angular/core';
import { RESTService } from '../rest.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.css']
})
export class ShowCategoryComponent implements OnInit {

  private jsonAttributes: JSON = null;
  objAttributes: any = null;

  constructor( private restService: RESTService, private dataService: DataService ) { }

  ngOnInit() {

//only for testing
    try {
      let strTemp: string = '{ "attributes": [ {"name": "Bezeichung", "typ":"Einfaches Textfeld", "mandatory":"1" }, {"name": "Hersteller", "typ":"Einfaches Textfeld", "mandatory":"0" },{"name": "KaufDatum", "typ":"Datum", "mandatory":"1" } ] }';
      this.dataService.setJsonAttributes( JSON.parse(strTemp) );
      console.log("showCategory onInit");
      console.log("JSON is valid and was set");
    } catch {
        console.log("JSON is invalid");
    }

    this.jsonAttributes = this.dataService.getJsonAttributes();
    console.log("CreateObject --onInit")
    console.log(this.jsonAttributes);

    this.objAttributes = this.jsonAttributes;

  }


}
