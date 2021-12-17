import { DataFetchService } from './../../../../services/data-fetch.service';
import { Employee } from './../../employee';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/containers/companies/company';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit, OnChanges {
  isFormSubmitted = false;
  maxDate;
  minDate;
  selectedDate: NgbDate;
  constructor(private formBuilder: FormBuilder, private dataFetchService: DataFetchService, private calendar: NgbCalendar, private datePipe: DatePipe,
    private ngbDateParserFormatter: NgbDateParserFormatter) {
    this.maxDate = NgbDate.from({ year: this.calendar.getToday().year - 16, month: this.calendar.getToday().month, day: this.calendar.getToday().day - 1 });
    this.minDate = NgbDate.from({ year: this.calendar.getToday().year - 50, month: this.calendar.getToday().month, day: this.calendar.getToday().day - 1 });
    // this.selectedDate = this.calendar.getToday();
  }

  @Input() details: Employee = null;
  @Output() employeeUpdated = new EventEmitter();
  @Output() closeEdit = new EventEmitter();
  employeeDetailsForm: FormGroup;
  companies: Company[] = [];
  selectedCompany: Company = null;


  ngOnInit() {
    this.employeeDetailsForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]{2,40}')])],
      lastName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]{2,40}')])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[A-Za-z]{2,3}')])],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      address: ['', Validators.required],
      mobile: ['', Validators.compose([Validators.required, Validators.minLength(7), Validators.pattern('[- +()0-9]+')])],
      company: ['', Validators.required],
      position: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9 ]{2,40}')])]
    });

    this.getAllCompanies();

    this.setValues();
  }

  getAllCompanies() {
    this.dataFetchService.getListOfCompanies().subscribe((companies: Company[]) => {
      if (companies && companies.length) {
        this.companies = companies;
      }
    })
  }

  submitEmployeeDetails() {
    this.isFormSubmitted = true;

    let formValues = this.employeeDetailsForm.value;

    formValues.fullName = `${this.employeeDetailsForm.get('firstName').value} ${this.employeeDetailsForm.get('lastName').value}`;
    formValues.email = this.employeeDetailsForm.get('email').value;
    formValues.gender = this.employeeDetailsForm.get('gender').value === 'true' ? true : this.employeeDetailsForm.get('gender').value === 'false' ? false : undefined;
    formValues.dob = NgbDate.from(this.employeeDetailsForm.get('dateOfBirth').value);
    formValues.companyId = this.employeeDetailsForm.get('company').value;
    formValues.address = this.employeeDetailsForm.get('address').value;
    formValues.mobile = this.employeeDetailsForm.get('mobile').value;
    formValues.position = this.employeeDetailsForm.get('position').value;
    formValues.id = this.details.id;


    
    
    if (this.employeeDetailsForm.valid) {
      const changes = this.dataFetchService.getChangesInObject(this.details, formValues);
      if (Object.entries(changes).length) {
        this.updateEmployeeDetails(this.details.id, changes);
      }
    }
  }

  setValues() {
    if (this.details) {
      this.employeeDetailsForm.get('firstName').setValue(this.details.fullName.split(' ')[0]);
      this.employeeDetailsForm.get('lastName').setValue(this.details.fullName.split(' ')[1]);
      this.employeeDetailsForm.get('email').setValue(this.details.email);
      this.employeeDetailsForm.get('gender').setValue((this.details.gender).toString());
      this.selectedDate = NgbDate.from(this.ngbDateParserFormatter.parse(this.datePipe.transform(this.details.dob,'yyyy-MM-dd')));      
      this.employeeDetailsForm.get('dateOfBirth').setValue(this.selectedDate);
      this.employeeDetailsForm.get('company').setValue(this.details.companyId);
      this.employeeDetailsForm.get('address').setValue(this.details.address);
      this.employeeDetailsForm.get('mobile').setValue(this.details.mobile);
      this.employeeDetailsForm.get('position').setValue(this.details.position);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.details && changes.details.previousValue && changes.details.currentValue.id !== changes.details.previousValue.id) {
      this.details = changes.details.currentValue;
      this.setValues();
    }
  }

  updateEmployeeDetails(id, changes: Employee) {
    debugger;
    let updatedEmployee: Employee = new Employee();
    if (changes) {
      if (changes.fullName) {
        updatedEmployee.fullName = changes.fullName;
      }
      if (changes.email) {
        updatedEmployee.email = changes.email;
      }
      if (changes.gender) {
        updatedEmployee.gender = changes.gender;
      }
      if (changes.dob) {
        
        updatedEmployee.dob = this.ngbDateParserFormatter.format(NgbDate.from({year: changes.dob.year, month: changes.dob.month, day: changes.dob.day}));
        if (updatedEmployee.dob === changes.dob) {
          delete updatedEmployee.dob;
        }
      }
      if (changes.companyId) {
        updatedEmployee.companyId = changes.companyId;
      }
      if (changes.address) {
        updatedEmployee.address = changes.address;
      }
      if (changes.mobile) {
        updatedEmployee.mobile = changes.mobile;
      }
      if (changes.position) {
        updatedEmployee.position = changes.position;
      }

      if (updatedEmployee) {
        this.dataFetchService.updateEmployee(id, updatedEmployee).subscribe((employeeUpdated) => {
          if (employeeUpdated) {
            this.employeeUpdated.emit(true);
          }
        });
      }
    }
  }

  // removeEmptyStringsFrom(obj) {
  //   const clone = { ...obj };
  //   Object.entries(clone).forEach(([key, val]) => (val === '' || val === undefined) && delete clone[key]);
  //   return clone;
  // }

  hideEmployeeDetails() {
    this.closeEdit.emit(true);
  }

}
