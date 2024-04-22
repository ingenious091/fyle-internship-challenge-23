import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs'; // for observables
import { ApiService } from '../../services/api.service';
import { mockUserData } from 'src/app/mock-data/mock-user-data'; // Replace with your mock data path

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let apiService: ApiService;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [RouterTestingModule, HttpClientModule], // Add HttpClientModule here
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ username: 'testuser' }), // Mock ActivatedRoute with username param
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges(); // detect initial changes
  });

  // Test successful user data fetch
  it('should set user info and navigate to user details on successful api call', () => {
    spyOn(apiService, 'getUserInfo').and.returnValue(of(mockUserData)); // Mock ApiService method

    component.ngOnInit();

    expect(component.userInfo).toBe(mockUserData);
    expect(component.isValidUsername).toBeTrue();
  });

  // Test failed user data fetch
  it('should set isValidUsername to false and navigate to search on api error', () => {
    const errorResponse = new Error('Not Found');
    spyOn(apiService, 'getUserInfo').and.returnValue(throwError(errorResponse));
    spyOn(component.router, 'navigate'); // Assuming router is injected in UserComponent

    component.ngOnInit();

    expect(component.isValidUsername).toBeFalse();
    expect(component.router.navigate).toHaveBeenCalledWith(['/search'], { queryParams: { userNotFound: true } });
  });

 
});
