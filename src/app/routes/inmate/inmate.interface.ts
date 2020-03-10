

export interface IGetInmatesResponse {
  inmates: IInmate[];
}

export interface IUpdateInmateResponse {
  inmateId: number;
}

export interface IInmate {
  id?: number;
  name: string;
  dateOfBirth: string;
  prisonCellNumber: number;
  intakeDateTime: string;
  locationHistory: ILocationHistory[];
}

export interface ILocationHistory {
  eventDateTime: string;
  location: string;
}
