import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html',
  styles: [`ul li {cursor: pointer}`]
})
export class SnippetsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
