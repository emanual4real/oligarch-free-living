import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { map } from 'rxjs';
import { PhotoGallery } from 'src/app/types/photos';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private readonly httpClient: HttpClient) {}

  getData() {
    return this.httpClient
      .get<PhotoGallery[]>(`${environment.apiUrl}/photos`)
      .pipe(map((data) => data.map((row) => ({ ...row, itemImageSrc: `${environment.apiUrl}/${row.itemImageSrc}` }))));
  }
}
