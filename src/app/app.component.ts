import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './core/layouts/navbar/navbar.component';
import { FooterComponent } from './core/layouts/footer/footer.component';
import { Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [RouterModule, NavbarComponent, FooterComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crud-faq-task';
  constructor(
    private translateService: TranslateService,
    @Inject(DOCUMENT) private document: Document) {
    localStorage.setItem('currentLang', 'en'); 

    this.translateService.onLangChange.subscribe(data => {
      let htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
      htmlTag.dir = data.lang === "ar" ? "rtl" : "ltr";
      this.translateService.setDefaultLang(data.lang);
      this.translateService.use(data.lang);
      // this.changeCssFile(data.lang);
    });    
  }

  changeCssFile(lang: string) {
    let headTag = this.document.getElementsByTagName("head")[0] as HTMLHeadElement;
    let existingLink = this.document.getElementById("langCss") as HTMLLinkElement;
    let bundleName = lang === "ar" ?  "arabicStyle.css":"englishStyle.css";
    if (existingLink) {
       existingLink.href = bundleName;
    } else {
       let newLink = this.document.createElement("link");
       newLink.rel = "stylesheet";
       newLink.type = "text/css";
       newLink.id = "langCss";
       newLink.href = bundleName;
       headTag.appendChild(newLink);
    }
    }
}

