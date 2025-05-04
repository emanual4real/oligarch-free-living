import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TextareaModule } from 'primeng/textarea';

export interface TextAreaProps {
  title: string;
  placeholder: string;
  icon: string;
  formControl: FormControl<string>;
}

@Component({
  selector: 'app-text-area',
  imports: [CommonModule, ReactiveFormsModule, InputGroupModule, InputGroupAddonModule, TextareaModule],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.css',
})
export class TextAreaComponent {
  props = input<TextAreaProps>();
}
