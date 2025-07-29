import { bootstrapApplication } from '@angular/platform-browser';
import { SmartBreakdownAppComponent } from './app/smart-breakdown-app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/smart-breakdown-app.routes';

bootstrapApplication(SmartBreakdownAppComponent, {
  providers: [
    provideRouter(routes)
  ]
})