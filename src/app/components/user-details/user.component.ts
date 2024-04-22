import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service'; // Import your API service
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  username!: string;
  userInfo!: any;
  userRepos!: any[];
  isValidUsername!: boolean;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    public router: Router
  ) {}

  ngOnInit(): void {
    // Get the username from the route parameter
    this.route.params.subscribe({
      next: (params) => {
        this.username = params['username'];
        // Fetch user information and repositories using the service
        this.apiService.getUserInfo(this.username).subscribe({
          next: (data: any) => {
            this.userInfo = data;
            this.isValidUsername = true;
          },
          error: (error) => {
            console.error('Error getting user info:', error);

            this.isValidUsername = false;
            this.router.navigate(['/search'], {
              queryParams: { userNotFound: true },
            });
          },
        });
      },
      error: (error) => {
        console.error('Error getting route parameters:', error);
      },
    });
  }
}
