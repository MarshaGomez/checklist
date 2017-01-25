import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup.component';
import { LoginComponent } from './login.component';
import { ChecklistComponent } from './checklist.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'checklist',
        component: ChecklistComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);