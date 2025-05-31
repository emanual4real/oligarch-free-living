import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '@services';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-politicians',
  imports: [TableModule, ToastModule, ButtonModule, CommonModule],
  templateUrl: './politicians.component.html',
  styleUrl: './politicians.component.css',
})
export class PoliticiansComponent {
  data$ = this.dataService.getPoliticians();

  constructor(private dataService: DataService) {}
}
