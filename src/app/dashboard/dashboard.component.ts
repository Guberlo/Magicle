import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../card';
import { CardService } from '../card.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cards: Card[] = [];

  constructor(private cardService: CardService) { }

  getCards(): void {
    this.cardService.getCards()
      .subscribe(cardsDTO => this.cards = cardsDTO.cards.slice(0, 5)); 
  }

  ngOnInit(): void {
    this.getCards();
  }

}
