import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RESTService } from '../rest.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  form: FormGroup;


  constructor(private fb: FormBuilder, private restService: RESTService, private dataService: DataService) { }

  ngOnInit() {
  }



  onSubmit() {

      // get the form data as an object
      let formObj = this.form.getRawValue();

      let jsonSearch: JSON = formObj;

      this.restService.putToRESTService("search", )

      this.dataService.

    }



}
