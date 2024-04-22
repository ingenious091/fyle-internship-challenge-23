import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that no outstanding requests are pending
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user info', () => {
    const mockUserInfo = {
      login: 'testuser',
      name: 'Test User',
      // Add other properties as needed
    };

    service.getUserInfo('testuser').subscribe((userInfo) => {
      expect(userInfo).toEqual(mockUserInfo);
    });

    const req = httpMock.expectOne('https://api.github.com/users/testuser');
    expect(req.request.method).toBe('GET');
    req.flush(mockUserInfo);
  });

  it('should fetch user repositories', () => {
    const mockUserRepos = [
      { name: 'repo1' },
      { name: 'repo2' },
      // Add other repo objects as needed
    ];

    service.getUserRepos('testuser', 1, 10).subscribe((repos) => {
      expect(repos).toEqual(mockUserRepos);
    });

    const req = httpMock.expectOne('https://api.github.com/users/testuser/repos?page=1&per_page=10');
    expect(req.request.method).toBe('GET');
    req.flush(mockUserRepos);
  });

  it('should handle errors when fetching user info', () => {
    service.getUserInfo('nonexistentuser').subscribe(
      () => fail('Expected an error, but got a successful response'),
      (error) => {
        expect(error).toBeTruthy();
        expect(error).toEqual('Failed to fetch user info');
      }
    );

    const req = httpMock.expectOne('https://api.github.com/users/nonexistentuser');
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('error'));
  });

  it('should handle errors when fetching user repositories', () => {
    service.getUserRepos('testuser', 1, 10).subscribe(
      () => fail('Expected an error, but got a successful response'),
      (error) => {
        expect(error).toBeTruthy();
        expect(error).toEqual('Failed to fetch user repositories');
      }
    );

    const req = httpMock.expectOne('https://api.github.com/users/testuser/repos?page=1&per_page=10');
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('error'));
  });
});
