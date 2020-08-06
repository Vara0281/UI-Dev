import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  year = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
  }
  goToTop() {
    // tslint:disable-next-line: deprecation
    event.preventDefault();
    window.scrollTo(0, 0);
  }

}
