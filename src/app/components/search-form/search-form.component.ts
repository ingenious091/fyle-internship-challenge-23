import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent {
  username: string = '';
  isApiLoading: boolean = false;
  @Output() searchUser = new EventEmitter<string>();

  constructor(private router: Router) {
  }

  search() {
    console.log(this.username);
    this.router.navigate(['/user', this.username]);
  }
}
