import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { LoginComponent } from './components/user/login/login.component';
import { AddRecipeComponent } from './components/recipe/add-recipe/add-recipe.component';
import { RegisterComponent } from './components/user/register/register.component';
import { RecipeDetailsComponent } from './components/recipe/recipe-details/recipe-details.component';
import { authGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


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
        component: AddRecipeComponent,
        canActivate: [authGuard]
    },
    {
        path: 'user-profile', 
        component: UserProfileComponent,
        canActivate: [authGuard]
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
        path: 'recipes',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: RecipeComponent
            },
            {
                path: ':recipeId',
                component: RecipeDetailsComponent
            },
        ]
    },
    {
        path: 'add-recipe',
        component: AddRecipeComponent,
        canActivate: [authGuard]
    }, 
    {
        path: '**',
        component: PageNotFoundComponent 
      }  
];
