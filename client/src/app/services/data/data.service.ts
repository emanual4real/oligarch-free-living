import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Company, Oligarch, Politician, Product, Project2025 } from '@types';
import { forkJoin, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { AuthService } from '../auth';

interface DataCache {
  oligarchs: Oligarch[];
  politicians: Politician[];
  products: Product[];
  companies: Company[];
  'companies/list': Partial<Company>[];
  project2025: Project2025[];
  search: (Oligarch | Product | Company | Project2025)[];
}

type DataCacheKey = keyof DataCache;

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private cache: DataCache = {
    oligarchs: [],
    politicians: [],
    products: [],
    companies: [],
    'companies/list': [],
    project2025: [],
    search: [],
  };

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

  private cacheOrFetchData<T>(key: DataCacheKey, override = false, query?: string) {
    const queryParams = query ? `?${query}` : '';
    return of(this.cache).pipe(
      map((data) => data[key]),
      switchMap((data) => {
        if (data.length > 0 && !override) {
          return of(data) as Observable<T[]>;
        }
        return this.httpClient.get<T[]>(`${environment.apiUrl}/${key}${queryParams}`).pipe(
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

  getPoliticians() {
    return this.cacheOrFetchData<Politician>('politicians');
  }

  getProducts() {
    return this.cacheOrFetchData<Product>('products');
  }

  getCompanies() {
    return this.cacheOrFetchData<Company>('companies');
  }

  getCompanyList() {
    return this.cacheOrFetchData<Partial<Company>>('companies/list');
  }

  getProject2025Data() {
    return this.cacheOrFetchData<Project2025>('project2025');
  }

  search(text: string) {
    const queryParam = `text=${text}`;
    return this.cacheOrFetchData<Oligarch | Product | Company | Project2025>('search', true, queryParam);
  }

  fetchAll() {
    return forkJoin([this.getOligarchs(), this.getProducts(), this.getCompanies(), this.getProject2025Data()]).pipe(
      take(1)
    );
  }

  addOligarch(body: Oligarch) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken}`,
    });
    this.httpClient
      .post<Oligarch>(`${environment.apiUrl}/oligarchs`, body, { headers })
      .pipe(take(1))
      .subscribe((data) => {
        this.cache.oligarchs.push(data);
      });
  }
}
