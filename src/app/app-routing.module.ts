import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchFormComponent } from './components/search-form/search-form.component'; // Import your search form component
import { UserComponent } from './components/user-details/user.component';
import { UserRepositoriesComponent } from './components/user-repositories/user-repositories.component'; // Import your user repositories component

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' }, // Redirect to search form component
  { path: 'search', component: SearchFormComponent }, // Route for the search form component
  { path: 'user/:username', component: UserComponent },
  { path: 'user/:username/repos', component: UserRepositoriesComponent }, // Route for the user repositories component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
