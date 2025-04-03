import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '@services';
import { Company } from '@types';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-companies',
  imports: [TableModule, CommonModule],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.css',
})
export class CompaniesComponent {
  data$: Observable<Company[]> = this.dataService.getCompanies();

  constructor(private dataService: DataService) {}
}
