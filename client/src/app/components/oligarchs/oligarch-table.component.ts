import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '@services';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { distinctUntilChanged, map, take, tap } from 'rxjs';

type Breakpoint = 'XSmall' | 'Small' | 'Medium' | 'Large';

interface Column {
  field: string;
  header: string;
  type: 'array' | 'text';
  sort?: boolean;
  breakpoint?: Breakpoint[];
}
@Component({
  selector: 'app-oligarch-table',
  imports: [TableModule, ToastModule, ButtonModule, CommonModule, RouterLink],
  templateUrl: './oligarch-table.component.html',
  styleUrl: './oligarch-table.component.css',
})
export class OligarchTableComponent implements OnInit {
  data$ = this.dataService.getOligarchs();
  expandedRows$ = this.data$.pipe(map((data) => data.map((row) => row.sources)));
  expandedRows = {};

  cols: Column[] = [
    {
      header: 'Name',
      field: 'name',
      type: 'text',
      sort: true,
    },
    {
      header: 'Companies',
      field: 'companies',
      type: 'array',
    },
    {
      header: 'Description',
      field: 'description',
      type: 'text',
      breakpoint: ['Medium', 'Large'],
    },
    // {
    //   header: 'Sources',
    //   field: 'sources',
    //   type: 'array',
    // },
  ];

  Breakpoints = Breakpoints;
  currentBreakpoint!: Breakpoint;

  readonly breakpoint$ = this.breakpointObserver
    .observe([Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
    .pipe(
      tap((value) => {
        console.log(value);
      }),
      distinctUntilChanged()
    );

  constructor(
    private dataService: DataService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.breakpoint$.subscribe(() => this.breakpointChanged());
  }

  private breakpointChanged() {
    if (this.breakpointObserver.isMatched(Breakpoints.Large)) {
      this.currentBreakpoint = 'Large';
    } else if (this.breakpointObserver.isMatched(Breakpoints.Medium)) {
      this.currentBreakpoint = 'Medium';
    } else if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
      this.currentBreakpoint = 'Small';
    } else if (this.breakpointObserver.isMatched(Breakpoints.XSmall)) {
      this.currentBreakpoint = 'XSmall';
    }
  }

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
