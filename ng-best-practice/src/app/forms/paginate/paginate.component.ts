import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.css']
})
export class PaginateComponent implements OnInit {
  isFetching = false;
  pager = {};
  employees = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.isFetching = true;
    this.route.queryParams.pipe(
      switchMap(params =>
        this.http.get<any>(`http://localhost:3000/api/paginate?page=${params.page || 1}`)))
      .subscribe(responce => {
        this.isFetching = false;
        this.pager = responce.pager;
        this.employees = responce.data;
      });
  }

}
