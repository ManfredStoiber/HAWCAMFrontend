import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.css']
})
export class ShowCategoryComponent implements OnInit {

  private jsonAttributes: JSON = null;
  objAttributes: any = null;

  constructor( private dataService: DataService ) { }

  ngOnInit() {

    this.jsonAttributes = this.dataService.getJsonAttributes();

    this.objAttributes = this.jsonAttributes;

  }


}
