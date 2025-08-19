import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '@services';
import { Oligarch } from '@types';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { map, Subscription } from 'rxjs';
import { OligarchCardComponent } from '../oligarch-card';
import { OligarchTableComponent } from '../oligarch-table';

@Component({
  selector: 'app-oligarch',
  imports: [
    CommonModule,
    FormsModule,
    OligarchCardComponent,
    OligarchTableComponent,
    MultiSelectModule,
    ToggleButtonModule,
  ],
  templateUrl: './oligarch.component.html',
  styleUrl: './oligarch.component.css',
})
export class OligarchComponent implements OnInit, OnDestroy {
  getScreenWidth?: number;
  getScreenHeight?: number;
  showTable = true;
  selectedOligarchs: string[] = [];
  data: Oligarch[] = [];
  filteredData: Oligarch[] = [];

  dataSubscription?: Subscription;

  constructor(private dataService: DataService) {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;

    if (this.getScreenWidth < 900) {
      this.showTable = false;
    }
  }

  ngOnInit(): void {
    this.dataSubscription = this.dataService
      .getOligarchs()
      .pipe(map((data) => data.sort((a, b) => (a.name < b.name ? -1 : 1))))
      .subscribe((data) => {
        this.data = data;
        this.filteredData = data;
      });
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  handleOnSelect() {
    if (this.selectedOligarchs.length > 0) {
      this.filteredData = this.data.filter((row) => this.selectedOligarchs.includes(row._id));
    } else {
      this.filteredData = this.data;
    }
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }
}
