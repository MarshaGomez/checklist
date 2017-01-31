import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup.component';
import { LoginComponent } from './components/login.component';
import { ChecklistComponent } from './components/checklist.component';

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