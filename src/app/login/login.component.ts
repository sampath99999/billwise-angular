import {Component, inject} from '@angular/core';
import {LogoComponent} from "../common/components/logo/logo.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputComponent} from "../common/components/input/input.component";
import {RestApiService} from "../common/services/rest-api.service";
import swal from "sweetalert2";
import {NgIf} from "@angular/common";

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		LogoComponent,
		InputComponent,
		ReactiveFormsModule,
		NgIf
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent {
	// Services
	fb: FormBuilder = inject(FormBuilder);
	api = inject(RestApiService);

	// Variables
	form: FormGroup = this.fb.group({
		username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
		password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
		rememberMe: false
	});
	formSubmitted: boolean = false;
	isLoading: boolean = false;



	// Functions
	login() {
		this.formSubmitted = true;
		if (this.form.invalid)
			return;
		this.isLoading = true;
		this.api.postData("login", this.form.value).then(
			(response: any): void => {
				localStorage.setItem("token", response.token);
			},
			(response) => {
				swal.fire("Warning", response.error.message ?? "Something Went Wrong!", "warning");
			}
		).finally(() => this.isLoading = false);

	}
}
