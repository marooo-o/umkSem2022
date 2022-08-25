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
  information_to_user = '';

  constructor(private userService: UserService,
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
    if(form.value.confirmPassword == form.value.password)
    {
      this.userService.registerUser(form.value.name, form.value.email, form.value.password).subscribe(
        (response: any) => {
          console.log("UDALO SIE");

        },
        (error: HttpErrorResponse) => {
          this.information_to_user = '';
          console.log("nie udalo sie");
        }
      );
    }
    else
    {
      this.information_to_user = 'Hasła się różnią';
    }

  }
}
