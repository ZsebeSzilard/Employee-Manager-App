import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  editForm: any;
  currentEmployee =new Employee();
  submitted = false;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getEmployee(this.route.snapshot.paramMap.get('id'));

    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      jobTitle: ['', Validators.required],
      phone : ['',
      [
          Validators.required,
          Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')
      ]
    ],
      imageUrl: ['', Validators.required]
  });
  }

  getEmployee(id:any): void {
    this.employeeService.getEmployee(id)
      .subscribe(
        data => {
          this.currentEmployee = data;
          this.updateFormValues();
        },
        error => {
          console.log(error);
        });
  }

  get formControls() { return this.editForm.controls; }

  updateFormValues() {
    this.editForm.patchValue({
      name: this.currentEmployee.name,
      email: this.currentEmployee.email,
      jobTitle: this.currentEmployee.jobTitle,
      phone: this.currentEmployee.phone,
      imageUrl: this.currentEmployee.imageUrl
    });
  }

  
  onSubmit() {
    this.submitted = true;

    if (this.editForm.invalid) {
        return;
    }

    this.updateEmployee();
    this.goToHomepage();
  }

  updateEmployee(): void {
    this.currentEmployee.name=this.editForm.value.name;
    this.currentEmployee.email=this.editForm.value.email;
    this.currentEmployee.phone=this.editForm.value.phone;
    this.currentEmployee.jobTitle=this.editForm.value.jobTitle;
    this.currentEmployee.imageUrl=this.editForm.value.imageUrl;

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
  
  goToHomepage():void{
    this.router.navigate(['/overview']);
  }

}
