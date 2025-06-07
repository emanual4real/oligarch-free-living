import { Component } from '@angular/core';
import { GalleryComponent } from '../gallery';
import { SearchComponent } from '../search';

@Component({
  selector: 'app-home',
  imports: [GalleryComponent, SearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
