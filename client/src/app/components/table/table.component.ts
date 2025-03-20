import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '@services';
import { ButtonModule } from 'primeng/button';
import {
  TableModule,
  TableRowCollapseEvent,
  TableRowExpandEvent,
} from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { map } from 'rxjs';

@Component({
  selector: 'app-table',
  imports: [TableModule, ToastModule, ButtonModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  data$ = this.dataService.getOligarchs();
  expandedRows$ = this.data$.pipe(
    map((data) => data.map((row) => row.sources))
  );
  expandedRows = {};

  constructor(private dataService: DataService) {}

  expandAll() {
    // this.expandedRows = this.data.reduce(
    //   (acc, p) => (acc[p.id] = true) && acc,
    //   {}
    // );
  }

  collapseAll() {
    this.expandedRows = {};
  }

  onRowExpand(event: TableRowExpandEvent) {}

  onRowCollapse(event: TableRowCollapseEvent) {}
}
