import { Routes } from '@angular/router';
import { Home } from '@app/features/home/home';

export const routes: Routes = [
    {
        path: 'json/formatter',
        loadComponent: () => import('@app/features/json-formatter/json-formatter').then(m => m.JsonFormatter)
    },
    {
        path: '**',
        component: Home
    }
]