import { Component, OnInit } from '@angular/core';
import { ENCOUNTERS_URL } from '../models/api';
import { EncountersAPIService } from '../apiService/encounters';
import { Encounter } from '../models/';

@Component({
  selector: 'app-encounters',
  templateUrl: './encounters.component.html',
  styleUrls: ['./encounters.component.scss'],
  providers: [EncountersAPIService],
})


export class EncountersComponent implements OnInit {
  encounters: Encounter[];
  customAnimation: any = { custom: true, state: "" };


  constructor(private encountersAPIService: EncountersAPIService) {
    this.getEncounters();
  }//constructor




  getEncounters() {
    this.encountersAPIService.getEncounters()
      .subscribe((result) => {
        this.encounters = result;
        console.log(result);
      })//subscribe-result
  }


  ngOnInit() {

  }



}




