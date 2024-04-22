import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError , Observable} from 'rxjs';
// import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // private readonly githubToken = process.env.githubToken; // Replace with your GitHub token

  constructor(private httpClient: HttpClient) {}

  getUserInfo(githubUsername: string): Observable<any> {
    return this.httpClient
      .get(`https://api.github.com/users/${githubUsername}`)
      .pipe(
        catchError((error) => {
          console.error('Error getting user info:', error);
          return throwError('Failed to fetch user info');
        })
      );
  }

  getUserRepos(username: string, page: number, perPage: number) {
    // const headers = new HttpHeaders().set(
    //   'Authorization',
    //   `token ${this.githubToken}`
    // );
    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    return this.httpClient
      .get(`https://api.github.com/users/${username}/repos`, {
        params,
      })
      .pipe(
        catchError((error) => {
          console.error('Error getting user repositories:', error);
          return throwError('Failed to fetch user repositories');
        })
      );
  }
}
