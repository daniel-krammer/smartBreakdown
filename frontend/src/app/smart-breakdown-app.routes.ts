import {  Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/smartbreakdown',
    pathMatch: 'full'
  },
  {
    path: 'smartbreakdown',
    loadComponent: () => import('../pages/smart-breakdown/smart-breakdown.component').then(m => m.SmartBreakdownComponent)
  },
  {
    path: '**',
    redirectTo: '/smartbreakdown'
  }
];
