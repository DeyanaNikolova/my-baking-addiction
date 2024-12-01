import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { UserComponent } from './components/user/user/user.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { LoginComponent } from './components/user/login/login.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },{
        path: 'recipes',
        component: RecipeComponent
    },
    {
        path: 'users',
        component: UserComponent
    },
    {
        path: 'user-profile', 
        component: UserProfileComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
];
