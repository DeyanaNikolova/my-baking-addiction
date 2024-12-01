import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { LoginComponent } from './components/user/login/login.component';
import { AddRecipeComponent } from './components/recipe/add-recipe/add-recipe.component';
import { RegisterComponent } from './components/user/register/register.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },{
        path: 'recipes',
        component: RecipeComponent
    },
    {
        path: 'add-recipe',
        component: AddRecipeComponent
    },
    {
        path: 'user-profile', 
        component: UserProfileComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }, 
    {
        path: 'register',
        component: RegisterComponent  
    },
    {
        path: 'add-recipe', 
        component: AddRecipeComponent
    }
];
