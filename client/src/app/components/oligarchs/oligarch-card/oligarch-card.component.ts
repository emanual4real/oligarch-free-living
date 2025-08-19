import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Oligarch } from '@types';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-oligarch-card',
  imports: [CardModule, RouterLink, NgOptimizedImage],
  templateUrl: './oligarch-card.component.html',
  styleUrl: './oligarch-card.component.css',
})
export class OligarchCardComponent {
  data = input<Oligarch>();
  src = 'oligarch.png';
}
