import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FaqService } from 'src/app/shared/faq.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';




@Component({
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatSnackBarModule],
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {
  questionId!: number;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private faqService: FaqService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteDialogComponent>) { }

  ngOnInit() {
    this.questionId = this.data.id;
  }

  deleteFaq() {
    this.faqService.deleteFaq(this.questionId).subscribe((response: any) => {
      this.dialogRef.close('delete');
      this.openSnackBar();
    });
  }

  closeDialog() {
    this.dialogRef.close('close');
  }

  private openSnackBar() {
    this._snackBar.open('FAQ has been deleted successfully!', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }

}
