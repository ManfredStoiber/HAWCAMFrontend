import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'appTitle',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})

export class TitleComponent implements OnInit {

  @Input('title') strTitle : string;

  constructor() { }

  ngOnInit() {
  }

}
