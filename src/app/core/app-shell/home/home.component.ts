import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Course} from '../../../courses/model/course';
import {Observable} from 'rxjs';
import {defaultDialogConfig} from '../../../courses/shared/default-dialog-config';
import {EditCourseDialogComponent} from '../../../courses/components/edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {map} from 'rxjs/operators';
import {CourseEntityService} from '../../../courses/services/course-entity.service';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

    promoTotal$: Observable<number>;

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    constructor(
      private dialog: MatDialog,
      private coursesService: CourseEntityService) {

    }

    ngOnInit() {
      this.reload();
    }

  reload() {

    this.beginnerCourses$ = this.coursesService.entities$
      .pipe(
        map(courses => courses.filter(course => course.category == 'FRONTEND'))
      );

    this.advancedCourses$ = this.coursesService.entities$
      .pipe(
        map(courses => courses.filter(course => course.category == 'BACKEND'))
      );

    this.promoTotal$ = this.coursesService.entities$
        .pipe(
            map(courses => courses.filter(course => course.promo).length)
        );

  }

  onAddCourse() {

    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle:"Create Course",
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);

  }


}
