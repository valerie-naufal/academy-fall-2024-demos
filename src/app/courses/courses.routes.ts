import {Routes} from "@angular/router";
import {HomeComponent} from "../core/app-shell/home/home.component";
import {CoursesResolver} from "./services/courses.resolver";
import {CourseComponent} from "./course/course.component";

export const coursesRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      courses: CoursesResolver
    }
  },
  {
    path: ':courseUrl',
    component: CourseComponent,
    resolve: {
      courses: CoursesResolver
    }
  }
];
