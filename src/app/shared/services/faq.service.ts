import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Faq } from '../../features/faq/models/faq.interface';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  showHideSubject = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) { }

  getFaqs() {
    return this.http.get('http://localhost:3000/faq');
  }

  getSingleFaq(id: number) {
    return this.http.get(`http://localhost:3000/faq/${id}`);
  }

  toggleVisibility(element: Faq) {
    return this.http.patch(`http://localhost:3000/faq/${element.id}`, {
      isShown: !element.isShown
    })
  }


  addFaq(faq: Faq) {
    return this.http.post(`http://localhost:3000/faq`,
      faq
    );
  }

  editFaq(faq: Faq, id: number) {
    return this.http.patch(`http://localhost:3000/faq/${id}`,
      faq
    );
  }

  deleteFaq(id: number) {
    return this.http.delete(`http://localhost:3000/faq/${id}`);
  }
}
