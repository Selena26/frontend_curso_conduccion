import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtHelper: JwtHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, JwtHelperService]
    });

    authService = TestBed.inject(AuthService);
    jwtHelper = TestBed.inject(JwtHelperService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('isAuth', () => {
    it('should return true when token is not expired', () => {
      spyOn(jwtHelper, 'isTokenExpired').and.returnValue(false);
      localStorage.setItem('token', 'validToken');
      
      const result = authService.isAuth();
      
      expect(result).toBeTrue();
    });

    it('should return false when token is expired', () => {
      spyOn(jwtHelper, 'isTokenExpired').and.returnValue(true);
      localStorage.setItem('token', 'expiredToken');
      
      const result = authService.isAuth();
      
      expect(result).toBeFalse();
    });

    it('should return false when token is missing', () => {
      spyOn(jwtHelper, 'isTokenExpired').and.returnValue(false);
      localStorage.removeItem('token');
      
      const result = authService.isAuth();
      
      expect(result).toBeFalse();
    });
  });
});
