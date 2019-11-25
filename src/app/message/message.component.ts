import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'appMessage',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})

export class MessageComponent implements OnInit {

  @Input('message') strMessage : string;

  constructor() { }

  ngOnInit() {
  }

}
