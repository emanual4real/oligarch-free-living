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
      breakpoint: '575px',
      numVisible: 0,
    },
  ];

  constructor(private photoService: PhotoService) {}
}
