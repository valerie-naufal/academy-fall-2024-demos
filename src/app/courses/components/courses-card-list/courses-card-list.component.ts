import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Course} from "../../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import {EditCourseDialogComponent} from "../edit-course-dialog/edit-course-dialog.component";
import {defaultDialogConfig} from '../../shared/default-dialog-config';
import {CourseEntityService} from '../../services/course-entity.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@Component({
    selector: 'courses-card-list',
    templateUrl: './courses-card-list.component.html',
    styleUrls: ['./courses-card-list.component.css'],
    standalone: true,
    imports: [MatCardModule, MatButtonModule, RouterLink, MatIconModule]
})
export class CoursesCardListComponent implements OnInit {

    @Input()
    courses: Course[];

    @Output()
    courseChanged = new EventEmitter();

    constructor(
      private dialog: MatDialog,
      private courseService: CourseEntityService) {
    }

    ngOnInit() {

    }

    editCourse(course:Course) {

        const dialogConfig = defaultDialogConfig();

        dialogConfig.data = {
          dialogTitle:"Edit Course",
          course,
          mode: 'update'
        };

        // if subscribe is deprecated
        this.dialog.open(EditCourseDialogComponent, dialogConfig)
          .afterClosed()
          .subscribe({
            next: () => this.courseChanged.emit(),
            error: console.error ,
            complete:  console.log
          });

    }

  onDeleteCourse(course:Course) {

        this.courseService.delete(course)
            .subscribe(
                () => console.log("Delete completed"),
                err => console.log("Deleted failed", err)
            );


  }

}









