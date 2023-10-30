import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { FaqService } from 'src/app/shared/faq.service';
import { Faq } from 'src/app/shared/interfaces/faq.interface';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from "@ngx-translate/core";



@Component({
  standalone: true,
  imports: [MatExpansionModule, NgFor, NgIf, TranslateModule],
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss']
})

export class WebsiteComponent implements OnInit {
  panelOpenState = false;
  allFaqs: Faq[] = [];
  filteredFaqs: Faq[] = [];
  categories: any[] = [];
  filteredCategories: any[] = ['All'];
  step = 0;
  currentLang: string = 'en';

  constructor(
    private faqService: FaqService,
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
      this.allFaqs = data;
      this.filteredFaqs = this.allFaqs.filter((faq: Faq) => {
        return faq.isShown === true;
      });

      this.categories = this.filteredFaqs.map((faq) => {
        return faq.categoryByEnglish;
      });

      console.log(this.categories);


      this.filteredCategories = this.categories.filter((cat, i) => {
        return this.categories.indexOf(cat) === i;
      });

      this.filteredCategories.unshift("All")
    });
  }

  flitereByCategory(cat: string) {
    this.filteredFaqs = this.allFaqs.filter(faq => {
      if (cat === 'All') {
        console.log(this.filteredFaqs);
        return faq;
      } else {
        console.log(this.filteredFaqs);
        return faq.categoryByEnglish === cat;
      }
    });
  }

  setStep(index: number) {
    this.step = index;
  }
}
