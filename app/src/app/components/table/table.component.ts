import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { Rating } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { DataService } from '@services';
import { OligarchData } from '@types';
import { map } from 'rxjs';

@Component({
  selector: 'app-table',
  imports: [TableModule, ToastModule, ButtonModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  data$ = this.dataService.getDataByOligarch();
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
