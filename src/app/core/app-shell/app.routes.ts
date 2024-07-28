import {Routes} from "@angular/router";
import {AuthGuard} from "../auth/state/auth.guard";

export const routes: Routes = [
  {
    path: 'courses',
    loadChildren: () => import('../../courses/courses.module').then(m => m.CoursesModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
