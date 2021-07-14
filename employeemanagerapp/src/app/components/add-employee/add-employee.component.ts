import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/services/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  exform: any;

  newEmployee = new Employee();

  submitted = false;

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.exform = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'jobTitle' : new FormControl(null, Validators.required),
      'phone' : new FormControl(
        null,
        [
          Validators.required,
          Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')
        ]),
      'imageUrl' : new FormControl(null, Validators.required)

    });
  }

  saveEmployee(): void {
    this.employeeService.addEmployee(this.newEmployee)
      .subscribe(
        response => {
          console.log(response);
          this.goToHomepage();
        },
        error => {
          console.log(error);
        });
  }

  resetEmployee(): void {
    this.submitted = false;
    this.newEmployee = new Employee();
    this.exform.reset();
  }

  goToHomepage():void{
    this.router.navigate(['/overview']);
  }

  get name() {
    return this.exform.get('name');
  }

  get email() {
    return this.exform.get('email');
  }

  get jobTitle() {
    return this.exform.get('jobTitle');
  }

  get phone() {
    return this.exform.get('phone');
  }

  get imageUrl(){
    return this.exform.get('imageUrl');
  }
}
