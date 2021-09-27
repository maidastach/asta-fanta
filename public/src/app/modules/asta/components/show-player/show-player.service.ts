import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AstaService } from 'src/app/services/asta/asta.service';

@Injectable({
  providedIn: 'root'
})
export class ShowPlayerService {
  
  constructor(private http: HttpClient, private astaService: AstaService) { }

  

}
