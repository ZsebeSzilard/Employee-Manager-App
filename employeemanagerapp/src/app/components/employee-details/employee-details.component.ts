import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/services/employee';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  exform: any;

  currentEmployee =new Employee();

  submitted = false;


  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getEmployee(this.route.snapshot.paramMap.get('id'));

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

  getEmployee(id:any): void {
    this.employeeService.getEmployee(id)
      .subscribe(
        data => {
          this.currentEmployee = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  clicksub() {
    this.updateEmployee();
    this.goToHomepage();
  }

  updateEmployee(): void {
    this.employeeService.updateEmployee(this.currentEmployee)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  deleteEmployee(): void {
    this.employeeService.deleteEmployee(this.currentEmployee?.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/employees']);
        },
        error => {
          console.log(error);
        });
  }
  
  goToHomepage():void{
    this.router.navigate(['/employees']);
  }

//form code
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
