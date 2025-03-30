import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '@services';
import { ButtonModule } from 'primeng/button';
import { TableModule, TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-products',
  imports: [TableModule, ToastModule, ButtonModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  data$ = this.dataService.getProducts();
  expandedRows$ = this.data$.pipe(map((data) => data.map((row) => row.sources)));
  expandedRows = {};

  constructor(private dataService: DataService) {}

  expandAll() {
    this.data$
      .pipe(
        map((data) =>
          data.reduce(
            // TODO: remove disabled linting

            (acc: { [key: string]: boolean }, p) => (acc[p._id] = true) && acc,
            {}
          )
        ),
        take(1)
      )
      .subscribe((data) => {
        this.expandedRows = data;
      });
  }

  collapseAll() {
    this.expandedRows = {};
  }

  onRowExpand(event: TableRowExpandEvent) {
    // TODO: remove this or remove parameter
    console.log('event', event);
  }

  onRowCollapse(event: TableRowCollapseEvent) {
    // TODO: remove this or remove parameter
    console.log('event', event);
  }
}
