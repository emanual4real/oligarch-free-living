import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Company, Oligarch, Product, Project2025 } from '@types';
import { map, Observable, of, switchMap, tap } from 'rxjs';

interface DataCache {
  oligarchs: Oligarch[];
  products: Product[];
  companies: Company[];
  project2025: Project2025[];
}

type DataCacheKey = keyof DataCache;

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private cache: DataCache = {
    oligarchs: [],
    products: [],
    companies: [],
    project2025: [],
  };

  constructor(private httpClient: HttpClient) {}

  private getCache(key: DataCacheKey) {
    return of(this.cache).pipe(map((data) => data[key]));
  }

  private cacheOrFetchData<T>(key: DataCacheKey) {
    return this.getCache(key).pipe(
      switchMap((data) => {
        if (data.length > 0) {
          return of(data) as Observable<T[]>;
        }
        return this.httpClient.get<T[]>(`${environment.apiUrl}/${key}`).pipe(
          tap((data) => {
            this.cache[key] = data as any;
          })
        );
      })
    );
  }

  getOligarchs() {
    return this.cacheOrFetchData<Oligarch>('oligarchs');
  }

  getProducts() {
    return this.cacheOrFetchData<Product>('products');
  }

  getCompanies() {
    return this.cacheOrFetchData<Company>('companies');
  }

  getProject2025Data() {
    return this.cacheOrFetchData<Project2025>('project2025');
  }
}
