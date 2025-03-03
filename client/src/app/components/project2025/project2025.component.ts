import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DataService } from '@services';

@Component({
  selector: 'app-project2025',
  imports: [TableModule, ToastModule, ButtonModule, CommonModule],
  templateUrl: './project2025.component.html',
  styleUrl: './project2025.component.css',
})
export class Project2025Component {
  data$ = this.dataService.getProject2025Data();

  constructor(private dataService: DataService) {}
}
