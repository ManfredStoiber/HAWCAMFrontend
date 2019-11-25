import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'appPath',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.css']
})

export class PathComponent implements OnInit {

  @Input('path') strPath : string;

  constructor() { }

  ngOnInit() {
  }

}
