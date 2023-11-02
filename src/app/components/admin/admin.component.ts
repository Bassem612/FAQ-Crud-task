import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FaqService } from 'src/app/shared/faq.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Faq } from 'src/app/shared/interfaces/faq.interface';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { TranslateModule } from "@ngx-translate/core";
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  imports: [
    MatTableModule,
    HttpClientModule,
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSortModule, 
    MatPaginatorModule, 
    TranslateModule, 
    CommonModule
  ],
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  faqs!: MatTableDataSource<Faq>;
  currentLang: string = 'en';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private faqService: FaqService,
    public dialog: MatDialog,
    private translateService: TranslateService
    ) { 
      this.translateService.setDefaultLang('en');
      this.translateService.onLangChange.subscribe(data => {
        this.currentLang = data.lang;
      });      
    }

  ngOnInit() {
    this.getFaqs();
  }

  private getFaqs() {
    this.faqService.getFaqs().subscribe((data: any) => {
      this.faqs = new MatTableDataSource(data);
      this.faqs.paginator = this.paginator;
      this.faqs.sort = this.sort;
    });
  }

  toggleShowHide(element: Faq) {
    this.faqService.toggleVisibility(element).subscribe((data) => {
      this.getFaqs();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);

    this.faqs.filter = filterValue.trim().toLowerCase();

    if (this.faqs.paginator) {
      this.faqs.paginator.firstPage();
    }
  }


  openDeleteDialog(id: number) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.getFaqs();
      }
    });
  }

  addFaqDialog(id?: number) {
    let dialogRef = this.dialog.open(AddDialogComponent, {
      width: '600px',
      height: '600px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getFaqs();
    });
  }


  displayedColumns: string[] = ['id', 'question', 'answer', 'category name', 'actions'];
}
