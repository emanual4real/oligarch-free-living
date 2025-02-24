import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
@Component({
  selector: 'app-menu',
  imports: [CommonModule, Menubar, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      route: '/',
    },
    {
      label: 'Oligarchs',
      icon: 'pi pi-user',
      route: 'oligarchs',
    },
    {
      label: 'Companies',
      icon: 'pi pi-briefcase',
      route: 'companies',
    },
    {
      label: 'Products',
      icon: 'pi pi-barcode',
      route: 'products',
    },
    {
      label: 'Politicians',
      icon: 'pi pi-flag',
      route: 'politicians',
    },
  ];
}
