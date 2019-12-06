import { Component, OnInit, Input } from '@angular/core';
import { HeaderData } from '../headerData.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // Auslesen des Input
  @Input('objHeaderData') objHeaderData : HeaderData;


  constructor() {

   }


  ngOnInit() {

  }

}
