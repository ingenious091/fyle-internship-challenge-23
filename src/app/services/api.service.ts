import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import * as e from 'cors';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getUserInfo(githubUsername: string) {
    console.log(githubUsername);
    console.log('here');
    return this.httpClient
      .get(`https://api.github.com/users/${githubUsername}`)
      .pipe(
        catchError((error) => {
          // Handle error here if necessary
          console.error('Error getting user info:', error);
          return throwError('Failed to fetch user info');
        })
      );
  }

  getUserRepos(username: string, page: number, perPage: number) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    return this.httpClient
      .get(`https://api.github.com/users/${username}/repos`, { params })
      .pipe(
        catchError((error) => {
          console.error('Error getting user repositories:', error);
          return throwError('Failed to fetch user repositories');
        })
      );
  }
}
