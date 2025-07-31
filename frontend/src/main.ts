import { bootstrapApplication } from '@angular/platform-browser';
import { SmartBreakdownAppComponent } from './app/smart-breakdown-app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/smart-breakdown-app.routes';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(SmartBreakdownAppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule)
  ]
})