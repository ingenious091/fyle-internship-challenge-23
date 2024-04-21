import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-repositories',
  templateUrl: './user-repositories.component.html',
  styleUrls: ['./user-repositories.component.scss'],
})
export class UserRepositoriesComponent implements OnInit {
  @Input() username!: string;
  @Input() totalPublicRepos!: number; // Input property to receive total number of public repositories
  userRepos!: any[];
  isLoading: boolean = true;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50, 100]; // Page size options

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchRepositories();
  }

  fetchRepositories() {
    this.isLoading = true;
    this.apiService
      .getUserRepos(this.username, this.currentPage, this.itemsPerPage)
      .subscribe(
        (data: any) => {
          this.userRepos = data;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error getting user repositories:', error);
          this.isLoading = false;
        }
      );
  }

  get totalPages(): number {
    return Math.ceil(this.totalPublicRepos / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchRepositories();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchRepositories();
    }
  }

  onPageChange(event: any) {
    this.itemsPerPage = event.target.value;
    this.currentPage = 1; // Reset to first page
    this.fetchRepositories();
  }
}
