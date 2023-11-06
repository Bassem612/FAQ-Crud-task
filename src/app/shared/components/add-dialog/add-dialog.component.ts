import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, NgIf } from '@angular/common';
import { FaqService } from 'src/app/shared/services/faq.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Faq } from 'src/app/features/faq/models/faq.interface';
import { TranslateModule } from "@ngx-translate/core";
import { TranslateService } from '@ngx-translate/core';


@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgIf,
    MatSnackBarModule,
    TranslateModule,
    CommonModule
  ],
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})

export class AddDialogComponent implements OnInit {
  addFaqForm!: FormGroup;
  formData!: FormData;
  faqToBeEdited!: Faq;
  allowEdit!: boolean;
  faqId!: number;
  addOrEditCaption!: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private formBuilder: FormBuilder,
    private faqService: FaqService,
    private _snackBar: MatSnackBar,
    private translateService: TranslateService
  ) {
    this.translateService.setDefaultLang('en');
  }

  ngOnInit(): void {
    this._initForm();
    this.patchForm();
    if (this.faqId) {
      this.watchFormChanges();
    } 
  }


  private _initForm() {
    this.addFaqForm = this.formBuilder.group({
      questionByEnglish: [null, [Validators.required]],
      answerByEnglish: [null, [Validators.required]],
      categoryByEnglish: [null, [Validators.required]],
      questionByArabic: [null, [Validators.required]],
      answerByArabic: [null, [Validators.required]],
      categoryByArabic: [null, [Validators.required]]
    });
  }

  private patchForm() {
    this.faqId = this.data.id;
    this.addOrEditCaption = this.faqId ? "Edit" : "Add";

    if (this.faqId) {
      this.faqService.getSingleFaq(this.faqId).subscribe((faq: any) => {
        this.faqToBeEdited = faq;
        this.addFaqForm.patchValue(faq);
      });
    }
  }

  submit() {
    if (!this.addFaqForm.valid) {
      return;
    }

    let data = {
      ...this.addFaqForm.value,
      isShown: true
    }

    if (this.addOrEditCaption === 'Add') {
      this.faqService.addFaq(data).subscribe((res) => {
        this.onNoClick();
        this.openSnackBar(this.translateService.instant('admin.addSnackbar'));
      });
    } else {
      this.faqService.editFaq(data, this.faqId).subscribe((res) => {
        this.onNoClick();
        this.openSnackBar(this.translateService.instant('admin.editSnackbar'));
      });
    }
  }


  private watchFormChanges() {
    this.addFaqForm.valueChanges.subscribe((data) => {
      this.formData = {
        ...data,
        isShown: true,
        id: this.faqToBeEdited.id
      };

      this.allowEdit = this.isObjectsEqual(this.formData, this.faqToBeEdited);
    });
  }

  private openSnackBar(message: string) {
    this._snackBar.open(`${message}`, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }

  private isObjectsEqual(object1: any, object2: any) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }
    return true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
