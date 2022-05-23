

export class RevenueReportChartModel{
  viewByAccommodation: ViewByAccommodationModel[];
  viewByDate: ViewByDateModel[];
}

export class ViewByAccommodationModel {
  objectId: string;
  name: string;
  amount: number;
  qty: number;
}

export class ViewByDateModel {
  date: number;
  amount: number;
  childs: ViewByAccommodationModel[];
}