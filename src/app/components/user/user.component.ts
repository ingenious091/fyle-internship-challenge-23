import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service'; // Import your API service

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  username!: string;
  userInfo!: any;
  userRepos!: any[];
  isValidUsername!: boolean;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    // Get the username from the route parameter
    this.route.params.subscribe(params => {
      console.log(params);
      this.username = params['username'];
      // Fetch user information and repositories using the service
      this.apiService.getUserInfo(this.username).subscribe(
        (data: any) => {
          this.userInfo = data;
          this.isValidUsername = true;
        },
        (error) => {
          console.error('Error getting user info:', error);
          this.isValidUsername = false;
        }
      );
    });
  }
}
