import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as RX from 'rxjs';
import { IGetInmatesResponse, IInmate, ILocationHistory } from './inmate.interface';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class InmateService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public inmates: IInmate[] = [];
  public didLoadInmates = false;

  public loadInmates(): Observable<HttpResponse<IGetInmatesResponse>> {
    const inmatesUrl = 'assets/inmates.json';
    return this.httpClient.get<IGetInmatesResponse>(inmatesUrl, { observe: 'response' }).pipe(
      tap((data) => {
        this.inmates = data.body.inmates;
        this.didLoadInmates = true;
        return data;
      })
    );
  }

  public updateInmate(inmate: IInmate): Observable<boolean> {
    const inmateToUpdate = this.inmates.find(item => item.id === inmate.id);
    if (inmateToUpdate) {
      inmateToUpdate.name = inmate.name;
      inmateToUpdate.prisonCellNumber = inmate.prisonCellNumber;
    }
    this.inmates.splice(this.inmates.indexOf(inmateToUpdate), 1, inmateToUpdate);
    return RX.of(true);
  }

  public addInmate(inmate: IInmate): Observable<boolean> {
    const newInmate = {
      ...inmate,
      id: this.inmates.length + 1
    };
    this.inmates.push(newInmate);
    return RX.of(true);
  }

  public addInmateLocationHistory(inmateId: number, locationHistory: ILocationHistory): Observable<boolean> {
    const inmate = this.inmates.find(item => item.id === inmateId);
    inmate.locationHistory.unshift(locationHistory);
    return RX.of(true);
  }

  public getInmates(): IInmate[] {
    return this.inmates;
  }

  public getInmate(id: number): IInmate {
    return this.inmates.find(inmate => inmate.id === id);
  }

  public deleteInmate(inmate: IInmate): void {
    this.inmates.splice(this.inmates.indexOf(inmate), 1);
  }

}
