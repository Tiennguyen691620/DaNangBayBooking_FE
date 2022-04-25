import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CustomerService } from './../../../../shared/services/customer.service';
import { CustomerFilterModel } from './../../../../shared/models/customer/customer-filter.model';
import { Component, OnInit } from '@angular/core';
import { CustomerModel } from 'src/app/shared/models/customer/customer.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-member-customer-list',
  templateUrl: './member-customer-list.component.html',
  styleUrls: ['./member-customer-list.component.scss'],
})
export class MemberCustomerListComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  totalCount = 0;
  dataSource: CustomerModel[] = [];
  filterModel = new CustomerFilterModel();
  searchTerm$ = new BehaviorSubject<string>('');

  constructor(private customerService: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.searchTerm$.pipe(debounceTime(600)).subscribe((_) => {
      this.filterModel.searchKey = this.searchTerm$.value;
      this.pageIndex = 1;
      this.filter();
    })
  }

  filter(pageIndex?: number): void {
    const filter = { ...this.filterModel };
    this.customerService
      .filterCustomer(pageIndex ? pageIndex : 1, this.pageSize, filter)
      .subscribe((res) => {
        this.dataSource = res.items;
        this.totalCount = res.totalRecords;
        // this.pageIndex = res.pageIndex + 1;
        if (res.items && res.items.length == 0 && res.pageCount > 0) {
          this.filter(res.pageCount);
        }
      });
  }

  onPageSizeChange(event: number): void {
    this.pageSize = event;
    this.pageIndex = 1;
    this.filter();
  }

  onPageIndexChange(event: number): void {
    this.filter(event);
  }

}
