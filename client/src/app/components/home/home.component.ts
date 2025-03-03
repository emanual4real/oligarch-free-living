import { Component, OnInit } from '@angular/core';
import { DataService } from '@services';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getFromApi().subscribe((data) => {
      console.log('data', data);
    });
  }
}
