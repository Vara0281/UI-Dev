import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CompareValidatorDirective } from './Validators/compare-validator.directive';
import { SelectRequiredValidatorDirective } from './Validators/select-required-validator.directive';
import { UniqueEmailValidatorDirective } from './Validators/unique-email-validator.directive';
import { UniqueUsernameValidatorDirective } from './Validators/unique-username-validator.directive';
import { EmployeeTitlePipe } from './employee-title.pipe';


@NgModule({
  imports: [],
  declarations: [
    CompareValidatorDirective,
    SelectRequiredValidatorDirective,
    UniqueEmailValidatorDirective,
    UniqueUsernameValidatorDirective,
    EmployeeTitlePipe,
  ],
  exports: [
    CommonModule,
    CompareValidatorDirective,
    UniqueEmailValidatorDirective,
    UniqueUsernameValidatorDirective,
    SelectRequiredValidatorDirective,
    EmployeeTitlePipe
  ]
})
export class SharedModule { }
