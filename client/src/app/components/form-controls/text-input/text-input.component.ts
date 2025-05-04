import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';

export interface TextInputProps {
  title: string;
  placeholder: string;
  icon: string;
  formControl: FormControl<string>;
}
@Component({
  selector: 'app-text-input',
  imports: [CommonModule, ReactiveFormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css',
})
export class TextInputComponent {
  props = input<TextInputProps>();
}
