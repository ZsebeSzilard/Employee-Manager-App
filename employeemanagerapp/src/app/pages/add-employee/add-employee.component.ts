import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
    addForm: any;
    submitted = false;

    constructor(
      private formBuilder: FormBuilder,
      private employeeService: EmployeeService,
      private router: Router) { }

    ngOnInit() {
        this.addForm = this.formBuilder.group({
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
    
    get formControls() { return this.addForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.addForm.invalid) {
            return;
        }

        this.saveEmployee();
    }


    saveEmployee(): void {
      this.employeeService.addEmployee(this.addForm.value)
        .subscribe(
          response => {
            console.log(response);
            this.goToHomepage();
          },
          error => {
            console.log(error);
          });
    }
  
    goToHomepage():void{
      this.router.navigate(['/overview']);
    }
  
}
