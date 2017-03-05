import { Component, OnInit } from '@angular/core';
import { NewColonist, Job } from '../models';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { COLONISTS_URL, JOBS_URL } from '../models/api';

import { ColonistAPIService } from '../apiService/colonist';
import { JobAPIService } from '../apiService/jobs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ColonistAPIService, JobAPIService]
})
export class RegisterComponent implements OnInit {

  newColonist: NewColonist;
  marsJobs: Job[];
  registerForm: FormGroup;
  clickedSubmit:boolean;
  
  constructor(private colonistApiService: ColonistAPIService,
              private JobAPIService: JobAPIService,
              private router: Router) {
    
    
    
    this.clickedSubmit = false;
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      age: new FormControl('', [Validators.required, this.acceptAge(18, 50)]),
      job_id: new FormControl('none', [Validators.required]),
    });//FormGroup

    this.getMarsJobs();
     
  }//constructor

  acceptAge(min:number, max:number){
    return (control: AbstractControl):{ [key: string]: any} => {
        if (control.value < min || control.value > max){
          return { "Sorry good luck": { age: control.value}};
        }//if statement
    }//return line 39
  }//acceptAge method


  getMarsJobs(){
     this.JobAPIService.getMarsJobs()
                        .subscribe((result) => {
                          this.marsJobs = result;
                        })

  }//getMarsJobsMethod

  postNewColonist(event){
    event.preventDefault();
    console.log('Posting colonists...');
    this.clickedSubmit = true;
    
    if (this.registerForm.invalid){
      

    }else{
      const name = this.registerForm.get('name').value;
      const age = this.registerForm.get('age').value;
      const job_id = this.registerForm.get('job_id').value;
      console.log(NewColonist);
      const newColonist = new NewColonist(name, age, job_id);
      this.colonistApiService.saveColonist({ colonist: newColonist })
                .subscribe((result) => {
                  this.router.navigate(['encounters']);
                  console.log('Colonist as saved:', result);
                });
    }//else

  }//postNewColonist

  ngOnInit() {

  }//ngOnInit

}//Register Component Oninit


