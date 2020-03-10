import { Component, OnInit } from '@angular/core';
import { InmateService } from '../inmate.service';
import { IInmate, ILocationHistory } from '../inmate.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';

@Component({
  selector: 'app-inmate-add-edit',
  templateUrl: './inmate-add-edit.component.html',
  styleUrls: ['./inmate-add-edit.component.scss']
})
export class InmateAddEditComponent implements OnInit {

  public inmateId: number;

  public mode: 'Add' | 'Edit';

  // Model
  public inmate: IInmate | null;

  // Table
  public tableColumns: string[] = ['eventDateTime', 'location'];
  public tableData: MatTableDataSource<ILocationHistory> = new MatTableDataSource([]);

  // Form - Details
  public addEditFormGroup: FormGroup = new FormGroup({});
  public nameControl = new FormControl('', [
    Validators.required
  ]);
  public dateOfBirthControl = new FormControl('', [
    Validators.required
  ]);
  public prisonCellNumberControl = new FormControl('', [
    Validators.required
  ]);
  public saveDetailsButtonDisabled = false;
  // Form - Location
  public locationFormGroup: FormGroup = new FormGroup({});
  public dateTimeControl = new FormControl('', [
    Validators.required
  ]);
  public locationControl = new FormControl('', [
    Validators.required
  ]);
  public saveLocationButtonDisabled = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private inmateService: InmateService
  ) { }

  ngOnInit(): void {

    this.inmateId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);

    this.mode = !!this.inmateId ? 'Edit' : 'Add';
    if (this.mode === 'Edit') {
      this.loadInmate();
    }

  }

  private loadInmate() {
    this.inmate = this.inmateService.getInmate(this.inmateId);
    // Controls
    this.nameControl.setValue(this.inmate.name);
    this.dateOfBirthControl.setValue(this.inmate.dateOfBirth);
    this.prisonCellNumberControl.setValue(this.inmate.prisonCellNumber);
    // History
    this.tableData = new MatTableDataSource(this.inmate.locationHistory);
  }

  public saveDetails() {

    const name: string = this.nameControl.value;
    const dateOfBirth: string = this.dateOfBirthControl.value;
    const prisonCellNumber: number = this.prisonCellNumberControl.value;

    if (!name || name.trim() === '' || !dateOfBirth || prisonCellNumber <= 0) {
      // todo show error
      return;
    }

    this.saveDetailsButtonDisabled = true;

    if (this.mode === 'Edit') {
      this.editInmate(name, prisonCellNumber);
    } else {
      this.addInmate(name, dateOfBirth, prisonCellNumber);
    }
  }

  public saveLocation() {

    const dateTime: string = this.dateTimeControl.value;
    const location: string = this.locationControl.value;

    if (!dateTime || !location || location.trim() === '') {
      // todo show error
      return;
    }

    this.saveLocationButtonDisabled = true;

    this.inmateService.addInmateLocationHistory(this.inmateId, {
      eventDateTime: dateTime,
      location
    }).subscribe(result => {
      if (result) {
        this.loadInmate();
        // TODO reset form
        this.saveLocationButtonDisabled = false;
      } else {
        // todo error
        this.saveLocationButtonDisabled = false;
      }
    });

  }

  public formatDateTime(date: string) {
    return moment(date).format('Do MMMM YYYY') + ' at ' + moment(date).format('h:mma');
  }

  private addInmate(
    name: string,
    dateOfBirth: string,
    prisonCellNumber: number
    ) {
    this.inmateService.addInmate({
      name,
      prisonCellNumber,
      dateOfBirth,
      intakeDateTime: new Date().toISOString(),
      locationHistory: []
    }).subscribe(result => {
      if (result) {
        this.router.navigate(['/inmate/list'], { relativeTo: this.activatedRoute });
      } else {
        // todo error
        this.saveDetailsButtonDisabled = false;
      }
    });
  }

  private editInmate(name: string, prisonCellNumber: number) {

    this.inmate = {
      ...this.inmate,
      name,
      prisonCellNumber
    };

    this.inmateService.updateInmate(this.inmate).subscribe(result => {
      if (result) {
        this.router.navigate(['/inmate/list'], { relativeTo: this.activatedRoute });
      } else {
        // todo error
        this.saveDetailsButtonDisabled = false;
      }
    });

  }

}
