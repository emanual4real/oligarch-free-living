import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';

export interface InputArrayProps {
  title: string;
  placeholder: string;
  icon: string;
  formArray: FormArray<FormControl<string>>;
}

@Component({
  selector: 'app-input-array',
  imports: [ButtonModule, CommonModule, ReactiveFormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule],
  templateUrl: './input-array.component.html',
  styleUrl: './input-array.component.css',
})
export class InputArrayComponent {
  props = input<InputArrayProps>();

  addControl() {
    this.props()?.formArray.controls.push(new FormControl('', { nonNullable: true }));
  }

  removeControl(index: number) {
    this.props()?.formArray.controls.splice(index, 1);
  }
}
