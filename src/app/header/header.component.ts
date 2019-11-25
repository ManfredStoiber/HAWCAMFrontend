import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'appHeader',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input('title') strTitle : string;
  @Input('path') strPath : string;
  @Input('message') strMessage : string;


  constructor() { }

  ngOnInit() {
  }

}
