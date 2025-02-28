import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { AppComponent } from './app/core/app-shell/app.component';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './app/core/reducers';
import { StoreModule } from '@ngrx/store';
import { AuthModule } from './app/core/auth/auth.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { AuthGuard } from './app/core/auth/auth.guard';
import { provideRouter, Routes } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

const routes: Routes = [
    {
        path: 'courses',
        loadChildren: () => import("./app/courses/courses.module").then(m => m.CoursesModule),
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: '/'
    }
];


if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, MatMenuModule, MatIconModule, MatSidenavModule, MatProgressSpinnerModule, MatListModule, MatToolbarModule, AuthModule.forRoot(), StoreModule.forRoot(reducers, {
            metaReducers,
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true,
                strictActionSerializability: true,
                strictStateSerializability: true
            }
        }), StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production, connectInZone: true }), EffectsModule.forRoot([]), EntityDataModule.forRoot({}), StoreRouterConnectingModule.forRoot({
            stateKey: 'router',
            routerState: RouterState.Minimal
        })),
        provideAnimations(),
        provideRouter(routes),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.log(err));
