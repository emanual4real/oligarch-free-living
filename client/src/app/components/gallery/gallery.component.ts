import { Component } from '@angular/core';
import { PhotoService } from '@services';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-gallery',
  imports: [GalleriaModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent {
  images$ = this.photoService.getData();
  responsiveOptions: any[] = [
    {
      breakpoint: '1300px',
      numVisible: 4,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
    },
  ];

  constructor(private photoService: PhotoService) {}
}
