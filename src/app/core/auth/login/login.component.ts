import { Component, OnInit, ViewEncapsulation, inject } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";

import { Store } from "@ngrx/store";

import { AuthService } from "../auth.service";
import { tap } from "rxjs/operators";
import { noop } from "rxjs";
import { Router } from "@angular/router";
import { AppState } from "../../reducers";
import { login } from "../auth.actions";
import { AuthActions } from "../action-types";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class LoginComponent implements OnInit {
  form: UntypedFormGroup;
  private store = inject(Store<AppState>);
  constructor(
    private fb: UntypedFormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = fb.group({
      email: ["nice.academy.student@inmind.ai", [Validators.required]],
      password: ["topsecret", [Validators.required]],
    });
  }

  ngOnInit() {}

  login() {
    const val = this.form.value;

    this.auth
      .login(val.email, val.password)
      .pipe(
        tap((user) => {
          this.store.dispatch(login({ user }));
          this.router.navigateByUrl("/courses");
        })
      )
      .subscribe(noop, () => alert("Login Failed"));
  }
}
