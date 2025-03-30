import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '@services';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

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
