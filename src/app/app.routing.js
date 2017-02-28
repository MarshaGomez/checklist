"use strict";
var router_1 = require('@angular/router');
var signup_component_1 = require('./components/signup.component');
var login_component_1 = require('./components/login.component');
var checklist_component_1 = require('./components/checklist.component');
var appRoutes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'signup',
        component: signup_component_1.SignupComponent
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'checklist',
        component: checklist_component_1.ChecklistComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map