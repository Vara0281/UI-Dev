import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '@shared/Services/employee.service';
import { IEmployee } from 'app/shared/models/IEmployee';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {

  selectedEmployeeId: string;
  @Input() emp: IEmployee;
  @Input() searchTerm: string;
  @Output() notifyDelete: EventEmitter<string> = new EventEmitter<string>();


  constructor(
    private route: ActivatedRoute,
    private empService: EmployeeService) { }

  deleteEmployee(id) {
    if (!confirm('Are You Sure to delete this record..?')) { return null; }
    this.empService.deleteEmployee(id).subscribe(
      () => console.log(`Employee with ID = ${id} Deleted`),
      (err) => console.log(err)
    );
    this.notifyDelete.emit(id);
  }

  ngOnInit() {
    this.selectedEmployeeId = this.route.snapshot.queryParamMap.get('id');
  }

}
