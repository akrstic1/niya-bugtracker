import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { JwtTokenInterceptor } from './interceptor/jwt-token.interceptor';
import { AppInitializerService } from './service/app-initializer.service';
import { AuthService } from './service/auth.service';
import { LocalStorageService } from './service/local-storage.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitalizerFactory,
      deps: [AuthService, LocalStorageService, AppInitializerService],
      multi: true,
    },
  ],
})
export class CoreModule {}

export function appInitalizerFactory(
  _authService: AuthService,
  _localStorageService: LocalStorageService,
  _appInitializerService: AppInitializerService
): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      const token = _localStorageService.getToken();
      if (token) {
        await _authService
          .loginWithJwt(token)
          .toPromise()
          .then(
            () => {
              _appInitializerService.setAuthServiceInitializationStatus(true);
            },
            () => {
              _appInitializerService.setAuthServiceInitializationStatus(false);
            }
          );
      }

      resolve(null);
    });
  };
}
