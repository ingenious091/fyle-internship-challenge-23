import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { UserComponent } from './components/user/user.component';
import { UserRepositoriesComponent } from './components/user-repositories/user-repositories.component';

@NgModule({
  declarations: [AppComponent, SearchFormComponent, UserComponent, UserRepositoriesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Add HttpClientModule here
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
