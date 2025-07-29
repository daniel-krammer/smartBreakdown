import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { SmartBreakdownAppComponent } from './app/smart-breakdown-app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/smart-breakdown-app-routing.module';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(SmartBreakdownAppComponent, {
  providers: [
    provideRouter(routes)
  ]
})