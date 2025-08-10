import { Routes } from '@angular/router';
import { Home } from '@app/features/home/home';
import { JsonFormatter } from './features/json-formatter/json-formatter';

export const routes: Routes = [
    {
        path: 'json/formatter',
        // loadComponent: () => import('@app/features/json-formatter/json-formatter').then(m => m.JsonFormatter)
        component: JsonFormatter
    },
    {
        path: '**',
        component: Home
    }
]