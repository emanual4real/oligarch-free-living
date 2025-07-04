import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '@services';
import { AutoCompleteCompleteEvent, AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { take } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [AutoCompleteModule, InputTextModule, IconField, InputIcon, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  items: string[] = [];

  value: any;

  constructor(
    private readonly dataService: DataService,
    private readonly router: Router
  ) {}

  onSelect(event: AutoCompleteSelectEvent) {
    const value = (event.value as string).toLowerCase();
    if (value.includes('oligarch')) {
      this.router.navigate(['oligarchs']);
    }
    if (value.includes('company')) {
      this.router.navigate(['companies']);
    }
    if (value.includes('product')) {
      this.router.navigate(['products']);
    }
    if (value.includes('project2025')) {
      this.router.navigate(['project2025']);
    }
    if (value.includes('politician')) {
      this.router.navigate(['politicians']);
    }
  }

  search(event: AutoCompleteCompleteEvent) {
    this.dataService
      .search(event.query)
      .pipe(take(1))
      .subscribe((data) => {
        this.items = data
          .map((row) => {
            switch (row.type) {
              case 'oligarch':
                return `Oligarch - ${row.name}`;
              case 'company':
                return `Company - ${row.companyName}`;
              case 'product':
                return `Product: - ${row.productName}`;
              case 'project2025':
                return `Project2025: - ${row.name}`;
              case 'politician':
                return `Politician: - ${row.name}`;
              default:
                return '';
            }
          })
          .flat();
      });
  }
}
