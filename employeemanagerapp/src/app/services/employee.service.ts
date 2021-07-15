import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {Employee} from 'src/app/model/employee';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class EmployeeService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.apiServerUrl}/objects`);
    }

    public getEmployee(employeeId: string | null): Observable<Employee> {
        return this.http.get<Employee>(`${this.apiServerUrl}/objects/${employeeId}`);
    }

    public addEmployee(employee: Employee): Observable<Employee> {
        return this.http.post<Employee>(`${this.apiServerUrl}/objects`, employee);
    }

    public updateEmployee(employee: Employee | null): Observable<Employee> {
        return this.http.put<Employee>(`${this.apiServerUrl}/objects`, employee);
    }

    public deleteEmployee(employeeId: number | undefined): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/objects/${employeeId}`);
    }
} 