import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchFormComponent } from './components/search-form/search-form.component'; // Import your search form component
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' }, // Redirect to search form component
  { path: 'search', component: SearchFormComponent }, // Route for the search form component
  { path: 'user/:username', component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
