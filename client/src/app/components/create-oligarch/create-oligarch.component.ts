import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '@services';
import { Options } from '@types';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { map } from 'rxjs';
import {
  InputArrayComponent,
  InputArrayProps,
  SelectArrayComponent,
  SelectArrayProps,
  TextAreaComponent,
  TextAreaProps,
  TextInputComponent,
  TextInputProps,
} from '../form-controls';

interface OligarchForm {
  name: FormControl<string>;
  oligarchRating?: FormControl<number>;
  description: FormControl<string>;
  sources: FormArray<FormControl<string>>;
  companies: FormArray<FormControl<string>>;
}

@Component({
  selector: 'app-create-oligarch',
  imports: [
    ButtonModule,
    CommonModule,
    Dialog,
    ReactiveFormsModule,
    TextInputComponent,
    TextAreaComponent,
    InputArrayComponent,
    SelectArrayComponent,
  ],
  templateUrl: './create-oligarch.component.html',
  styleUrl: './create-oligarch.component.css',
})
export class CreateOligarchComponent {
  visible: boolean = false;
  companyList$ = this.dataService.getCompanyList().pipe(
    map((data) => {
      const options = data
        .filter((row) => row._id && row.companyName)
        .map((row) => ({ id: row._id, label: row.companyName })) as Options[];
      return options;
    })
  );

  formGroup: FormGroup<OligarchForm> = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
    sources: new FormArray<FormControl>([new FormControl('', { nonNullable: true })]),
    companies: new FormArray<FormControl>([new FormControl('', { nonNullable: true })]),
  });

  get oligarchNameProps() {
    const props: TextInputProps = {
      title: 'Oligarch Name',
      formControl: this.formGroup.controls.name,
      placeholder: 'Name',
      icon: 'pi pi-user',
    };
    return props;
  }

  get descriptionProps() {
    const props: TextAreaProps = {
      title: 'Description',
      formControl: this.formGroup.controls.description,
      placeholder: 'Description',
      icon: 'pi pi-align-justify',
    };
    return props;
  }

  get companyProps() {
    const props: SelectArrayProps = {
      title: 'Companies',
      formArray: this.formGroup.controls.companies,
      placeholder: 'Companies',
      icon: 'pi pi-briefcase',
    };
    return props;
  }

  get sourcesProps() {
    const props: InputArrayProps = {
      title: 'Sources',
      formArray: this.formGroup.controls.sources,
      placeholder: 'Sources',
      icon: 'pi pi-book',
    };
    return props;
  }

  constructor(private dataService: DataService) {}

  showDialog() {
    this.visible = true;
  }

  addSource() {
    this.formGroup.controls.sources.push(new FormControl('', { nonNullable: true }));
  }

  removeSource(index: number) {
    this.formGroup.controls.sources.removeAt(index);
  }

  addCompany() {
    this.formGroup.controls.companies.push(new FormControl('', { nonNullable: true }));
  }

  removeCompany(index: number) {
    this.formGroup.controls.companies.removeAt(index);
  }
}
