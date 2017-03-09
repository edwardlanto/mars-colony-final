import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Alien, NewEncounter, Encounter } from '../models';
import { AliensAPIService } from '../apiService/aliens';
import { EncountersAPIService } from '../apiService/encounters';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [AliensAPIService, EncountersAPIService]
})
export class ReportComponent implements OnInit {

  newEncounter: NewEncounter;
  alienType: Alien[];
  reportForm: FormGroup;

  constructor(private AliensAPIService: AliensAPIService, private EncountersAPIService: EncountersAPIService, private router: Router) {
    this.reportForm = new FormGroup({
      atype: new FormControl('', [Validators.required,]),
      action: new FormControl('', [Validators.required]),
    })//report form

    this.getAliens();

  }//constructor


  getAliens() {
    this.AliensAPIService.getAliens()
      .subscribe((result) => {
        this.alienType = result;
        console.log(result)
      })

  }//getAliensMethod

  saveNewEncounter(event) {
    event.preventDefault();

    if (this.reportForm.invalid) {


    } else {
      const date = new Date().toString();
      const colonistStore = localStorage.getItem('colonistStorage');
      const atype = this.reportForm.get('atype').value;
      const colonist_id = 4;
      const action = this.reportForm.get('action').value;
      console.log(localStorage.getItem('colonistStorage'));
      const newEncounter = new NewEncounter(date, atype, colonist_id, action);
      this.EncountersAPIService.saveNewEncounter({ encounter: newEncounter })
        .subscribe((result) => {
          this.router.navigate(['encounters']);
          // console.log('Colonist as saved');


        });
    }//else



  }//saveNewEncounter


  ngOnInit() {
  }//ngOnit

}//ReportComponent Oninit