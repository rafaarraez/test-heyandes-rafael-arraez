import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() text: string;
  @Input() total: number;
  @Input() month: string;

  constructor() { }

  ngOnInit(): void {
  }

}
