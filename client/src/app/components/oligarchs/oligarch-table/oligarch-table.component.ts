import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@services';
import { Oligarch } from '@types';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ModifyOligarchComponent } from '../modify-oligarch';

@Component({
  selector: 'app-oligarch-table',
  imports: [TableModule, ToastModule, ButtonModule, CommonModule, RouterLink, ModifyOligarchComponent],
  templateUrl: './oligarch-table.component.html',
  styleUrl: './oligarch-table.component.css',
})
export class OligarchTableComponent {
  data = input<Oligarch[]>([]);
  getExpandedRows = computed(() => this.data().map((row) => row.sources));
  companyOptions = computed(() => this.data().map((row) => row.companies));

  expandedRows = {};
  // isAdmin = this.authService.hasToken;
  isAdmin = true;

  constructor(private authService: AuthService) {}

  expandAll() {
    this.expandedRows = this.getExpandedRows();
  }

  collapseAll() {
    this.expandedRows = {};
  }
}
