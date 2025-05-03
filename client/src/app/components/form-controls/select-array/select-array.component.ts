import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Options } from '@types';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

export interface SelectArrayProps {
  title: string;
  placeholder: string;
  icon: string;
  formArray: FormArray<FormControl<string>>;
}

@Component({
  selector: 'app-select-array',
  imports: [
    ButtonModule,
    CommonModule,
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    SelectModule,
  ],
  templateUrl: './select-array.component.html',
  styleUrl: './select-array.component.css',
})
export class SelectArrayComponent {
  props = input<SelectArrayProps>();
  options = input<Options[]>();
  addControl = output();
  removeControl = output<number>();

  handleAddControl() {
    this.addControl.emit();
  }

  handleRemoveControl(index: number) {
    this.removeControl.emit(index);
  }
}
