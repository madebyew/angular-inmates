import { Component, OnInit, ViewChild } from '@angular/core';
import { InmateService } from '../inmate.service';
import { IInmate } from '../inmate.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-inmate-list',
  templateUrl: './inmate-list.component.html',
  styleUrls: ['./inmate-list.component.scss']
})
export class InmateListComponent implements OnInit {

  public tableColumns: string[] = ['name', 'dateOfBirth', 'prisonCellNumber', 'intakeDateTime', 'currentLocation', 'actions'];
  public tableData: MatTableDataSource<IInmate> = new MatTableDataSource([]);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private inmateService: InmateService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.tableData.sort = this.sort;

    // If no data loaded, load it
    if (!this.inmateService.didLoadInmates) {
      this.inmateService.loadInmates().subscribe(response => {
        if (response && response.status === 200) {
          this.tableData = new MatTableDataSource(response.body.inmates);
          this.tableData.sort = this.sort;
        } else {
          // todo error
        }
      });
    } else {
      // Use existing date
      this.tableData = new MatTableDataSource(this.inmateService.getInmates());
      this.tableData.sort = this.sort;
    }

  }

  public currentLocation(inmate: IInmate): string {
    if (inmate && inmate.locationHistory && inmate.locationHistory.length) {
      const mostRecentHistory = inmate.locationHistory.map(item => item.eventDateTime).reduce((a, b) => a > b ? a : b );
      const mostReccentLocation = inmate.locationHistory.find(item => item.eventDateTime === mostRecentHistory);
      return mostReccentLocation.location;
    }
    return null;
  }

  public formatDate(date: string) {
    return moment(date).format('DD/MM/YYYY');
  }

  public formatDateTime(date: string) {
    return moment(date).format('Do MMMM YYYY') + ' at ' + moment(date).format('h:mma');
  }

  filterTableData(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableData.filter = filterValue.trim().toLowerCase();
  }

  public goToEditInmate(inmate: IInmate) {
    this.router.navigate(['../', 'edit', inmate.id], { relativeTo: this.activatedRoute });
  }

  public deleteInmate(inmate: IInmate) {
    this.inmateService.deleteInmate(inmate);
    this.tableData = new MatTableDataSource(this.inmateService.getInmates());
    this.tableData.sort = this.sort;
  }

}
