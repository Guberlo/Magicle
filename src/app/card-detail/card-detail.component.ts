import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CardService } from '../card.service';
import { Card } from '../card';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnInit {

  @Input() card?: Card;

  constructor(
    private route: ActivatedRoute, 
    private location: Location, 
    private cardService: CardService
    ) { }

  ngOnInit(): void {
    this.getCard();
  }

  getCard(): void {
    const name = this.route.snapshot.paramMap.get('name')!;
    this.cardService.getCard(name)
      .subscribe(cardsDTO => this.card = cardsDTO.cards[0]);
  }

  goBack(): void {
    this.location.back();
  }

}
