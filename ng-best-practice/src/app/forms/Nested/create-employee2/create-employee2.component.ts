import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee, ISkill } from '@shared/models/IEmployee';
import { Employee2Service } from '@shared/Services/employee2.service';
import { compareValidator } from '@shared/Validators/compare-validator.directive';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-employee2',
  templateUrl: './create-employee2.component.html',
  styleUrls: ['./create-employee2.component.css']
})
export class CreateEmployee2Component implements OnInit {
  employeeForm: FormGroup;
  id: string;

  constructor(
    private fb: FormBuilder, private aRoute: ActivatedRoute,
    private empService: Employee2Service, private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.createForm();

    this.aRoute.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');
        this.getEmployee(this.id);
      } else {
        this.employeeForm.removeControl('_id');
      }
    });
  }

  createForm() {
    this.employeeForm = this.fb.group({
      _id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      contactPreference: ['email'],
      email: ['', Validators.required],
      confirmemail: ['', [Validators.required, compareValidator('email')]],
      phone: [''],
      skills: this.fb.array([this.addSkillFormGroup()]),
      // name: ['', [Validators.required, Validators.minLength(3)], uniqueUsernameValidator(this.empService)],
      // email: ['', [Validators.required], uniqueEmailValidator(this.empService)],
    });

    this.employeeForm.get('contactPreference').valueChanges.subscribe(selectedValue =>
      this.onContactPrefernceChange(selectedValue));
  }

  onContactPrefernceChange(selectedValue: string) {
    const phoneFormControl = this.phone;
    if (selectedValue === 'phone') {
      phoneFormControl.setValidators([Validators.required, Validators.pattern(/^\d{10}$/)]);
    } else {
      phoneFormControl.clearValidators();
      phoneFormControl.setValidators([Validators.pattern(/^\d{10}$/)]);
    }
    phoneFormControl.updateValueAndValidity();
  }

  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      experienceInYears: ['', Validators.required],
      proficiency: ['', Validators.required]
    });
  }

  addSkillButtonClick() {
    return this.skills.push(this.addSkillFormGroup());
  }

  removeSkill(id: number) {
    const skillsFormArray = this.skills;
    skillsFormArray.removeAt(id);
    skillsFormArray.markAsTouched();
    skillsFormArray.markAsDirty();
  }

  getEmployee(id: string) {
    this.empService.getEmployee(id).subscribe(
      emp => this.editEmployeeForm(emp),
      error => {
        this.toastr.error(`Employee with ${id} Not Found`, error.status);
        this.router.navigate(['forms/reactiveform']);
      }
    );
  }

  editEmployeeForm(employee: IEmployee) {
    this.employeeForm.removeControl('confirmemail');

    this.employeeForm.patchValue({
      _id: employee._id,
      name: employee.name,
      contactPreference: employee.contactPreference,
      email: employee.email,
      phone: employee.phone
    });
    this.employeeForm.setControl('skills', this.setExistingskills(employee.skills));
  }

  setExistingskills(skills: ISkill[]): FormArray {
    const formArray = new FormArray([]);
    skills.forEach(skill => {
      formArray.push(
        this.fb.group({
          skillName: [skill.skillName, Validators.required],
          experienceInYears: [skill.experienceInYears, Validators.required],
          proficiency: [skill.proficiency, Validators.required]
        })
      );
    });
    return formArray;
  }

  onSubmit() {
    if (this.id) {
      this.empService.updateEmployee(this.employeeForm.value)
        .subscribe(() => {
          this.toastr.success(`Employee Updated Succesfully`);
          this.employeeForm.reset();
          this.router.navigate(['forms/reactiveform']);
        },
          (error: any) => console.log(error)
        );
    } else {
      const { confirmemail, ...employee } = this.employeeForm.value;
      console.log(employee);
      this.empService.addEmployee(employee)
        .subscribe(
          (res) => {
            this.toastr.success(`Employee Added Succesfully`);
            this.employeeForm.reset();
            this.router.navigate(['forms/reactiveform']);
          },
          (error: any) => console.log(error)
        );
    }
  }

  get skills() {
    return this.employeeForm.get('skills') as FormArray;
  }
  get name() {
    return this.employeeForm.get('name');
  }
  get phone() {
    return this.employeeForm.get('phone');
  }
  get email() {
    return this.employeeForm.get('email');
  }
  get confirmemail() {
    return this.employeeForm.get('confirmemail');
  }

}
