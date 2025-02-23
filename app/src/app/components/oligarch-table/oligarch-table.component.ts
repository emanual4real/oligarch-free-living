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
import { map, take } from 'rxjs';

@Component({
  selector: 'app-oligarch-table',
  imports: [TableModule, ToastModule, ButtonModule, CommonModule],
  templateUrl: './oligarch-table.component.html',
  styleUrl: './oligarch-table.component.css',
})
export class OligarchTableComponent {
  data$ = this.dataService.getDataByOligarch();
  expandedRows$ = this.data$.pipe(
    map((data) => data.map((row) => row.sources))
  );
  expandedRows = {};

  constructor(private dataService: DataService) {}

  expandAll() {
    this.data$
      .pipe(
        map((data) =>
          data.reduce(
            (acc: { [key: string]: boolean }, p) => (acc[p.id] = true) && acc,
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

  onRowExpand(event: TableRowExpandEvent) {}

  onRowCollapse(event: TableRowCollapseEvent) {}
}
