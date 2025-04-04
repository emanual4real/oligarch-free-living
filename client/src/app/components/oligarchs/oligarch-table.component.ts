import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '@services';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-oligarch-table',
  imports: [TableModule, ToastModule, ButtonModule, CommonModule, RouterLink],
  templateUrl: './oligarch-table.component.html',
  styleUrl: './oligarch-table.component.css',
})
export class OligarchTableComponent {
  data$ = this.dataService.getOligarchs();
  expandedRows$ = this.data$.pipe(map((data) => data.map((row) => row.sources)));
  expandedRows = {};

  constructor(private dataService: DataService) {}

  expandAll() {
    this.data$
      .pipe(
        map((data) =>
          data.reduce(
            // TODO: remove disable linting

            (acc: Record<string, boolean>, p) => (acc[p._id] = true) && acc,
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
}
