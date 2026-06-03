import { ApplicationConfig } from '@angular/core';
import { provideNgxMask } from 'ngx-mask';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideNgxMask()
  ]
};
