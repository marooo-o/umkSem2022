import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, FormsModule} from '@angular/forms';
import {NgForm, Validators} from '@angular/forms';
import {UserService} from "../shared/services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  registerForm: FormGroup;

  constructor(
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
        name: new FormControl(),
        email: new FormControl(),
        password: new FormControl(),
        confirmPassword: new FormControl(),
      },{});
  }

  addNewUser(form: any) {
    console.log(form.value.name)
    // this.userService.registerUser(form.value.firstName, form.value.lastName, form.value.pesel, form.value.email, form.value.password).subscribe(
    //   (response: any) => {
    //     this.router.navigate(['/confirm-mail'], {
    //       queryParams: {
    //         name: form.value.firstName,
    //         email: form.value.email
    //       }
    //     });
    //   },
    //   (error: HttpErrorResponse) => {
    //     form.reset();
    //   }
    // );
  }
}
