import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { SearchComponent } from '../search';
@Component({
  selector: 'app-home',
  imports: [ButtonModule, CheckboxModule, MultiSelectModule, SearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // just a javascript class

  cat = 'meow';
  dog: string = 'woof';

  doStuff() {
    console.log('doing something');
  }
}
