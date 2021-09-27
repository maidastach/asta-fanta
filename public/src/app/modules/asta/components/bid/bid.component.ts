import { Component, OnInit } from '@angular/core';
import { CurrentBid } from 'src/app/Models';
import { AstaService } from 'src/app/services/asta/asta.service';

@Component(
  {
    selector: 'app-bid',
    templateUrl: './bid.component.html',
    styleUrls: ['./bid.component.sass']
  }
)

export class BidComponent implements OnInit 
{
  public currentBid!: CurrentBid;

  constructor(private astaService: AstaService) { }

  ngOnInit(): void
  {
    this.astaService.getCurrentBid().subscribe(currentBid => this.currentBid = currentBid) // should be in astaservice
    this.astaService.currentBid.subscribe(currentBid => this.currentBid = currentBid)
  }

}
