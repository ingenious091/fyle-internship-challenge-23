import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  username: string = '';
  isApiLoading: boolean = false;
  userNotFound: boolean = false;

  constructor(public router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userNotFound = params['userNotFound'] === 'true';
    });
  }

  search() {
    this.router.navigate(['/user', this.username]);
  }
}
