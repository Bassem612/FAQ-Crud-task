import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentGregorianDate: string = "";
  currentHijriDate: string = "";

  ngOnInit() {
      this.getCurrentDate();
      this.getCurrentHijriDate();
  }


  private getCurrentDate() {
    const date = new Date();    
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    this.currentGregorianDate = `${day}-${month}-${year}`;
  }

  private getCurrentHijriDate() {
    this.currentHijriDate = new Intl.DateTimeFormat('en-TN-u-ca-islamic', {day: 'numeric', month: 'long', weekday: 'long', year: 'numeric'}).format(new Date());    
  }

}
