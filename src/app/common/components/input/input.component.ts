import {Component, Input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
	selector: 'app-input',
	standalone: true,
	imports: [
		ReactiveFormsModule
	],
	templateUrl: './input.component.html',
	styleUrl: './input.component.scss'
})
export class InputComponent {
	@Input() _label!: string;
	@Input() _formControlName!: any;
	@Input() _type!: string;
	@Input() _placeholder!: string;
	@Input() _parentFormGroup!: FormGroup
	@Input() _formSubmitted!: boolean;
	@Input() _class: string = '';

	@Input() _disabled: boolean = false;

	isFieldInvalid() {
		return (this._formSubmitted || this._parentFormGroup.controls[this._formControlName]?.touched || this._parentFormGroup.controls[this._formControlName]?.dirty) && this._parentFormGroup.get(this._formControlName)?.invalid
	}

	getErrorMessage(): String {
		let formControls: any = this._parentFormGroup.controls;
		if (this.isFieldInvalid()) {
			if (formControls[this._formControlName].hasError("required")) return this._label + " is required";
			if (formControls[this._formControlName].hasError("minlength")) return this._label + " should be at least " + formControls[this._formControlName].errors.minlength.requiredLength + " characters";
			if (formControls[this._formControlName].hasError("maxlength")) return this._label + " should be at least " + formControls[this._formControlName].errors.mmaxlength.requiredLength + " characters";
			if (formControls[this._formControlName].hasError("pattern")) return this._label + " is invalid";
		}
		return '';
	}
}
