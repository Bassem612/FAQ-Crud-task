import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from "@ngx-translate/core";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterModule, TranslateModule, HttpClientModule, CommonModule],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  currentRoute!: string;
  nextView: string = "website";
  nextRoute: string = "/website";

  constructor(private router: Router, private translateService: TranslateService) {}
    changeLangage(lang: string) {
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
    console.log(lang);
}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.currentRoute = event.url;  
        this.toggleNavigation();
      }});
  }
  

  toggleNavigation() {
    if(this.currentRoute === '/') {
      this.nextView = "website";
      this.nextRoute = "/website";
    }else {
      this.nextView = "admin";
      this.nextRoute = "/";
    }
    
  }
}
