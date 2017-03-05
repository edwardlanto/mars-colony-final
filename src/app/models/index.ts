// Colonist Interface

export interface Colonist {
    name:string;
    job:Job;
    id:string; 
    age:number;
}

export interface Job{
    name:string;
    id:string;
    description:string;
}



// Alien

export interface Alien{
    type:string;
    submitted_by:string;
    id:number;
    description:string
}

export class Alien{
    type:string;
    submitted_by:string;
    id:number;
    description:string
    
}


// Encounter Interface

export interface Encounter{
    id:string;
    date:number;
    colonist_id:number;
    atype:string;
    action:string;
}


// New Colonist Class
export class NewColonist {
    name:string;
    age:string;
    job_id:string;
    constructor(name:string, age:string, job_id:string){
        this.name = name;
        this.age = age;
        this.job_id = job_id;
    }
}

// New Encounter class 
export class NewEncounter{
    date:string;
    atype:string;
    action:string;
    colonist_id:number;
    constructor(date:string, atype:string, colonist_id:number, action){
        this.date = date;
        this.atype = atype;
        this.colonist_id = colonist_id;
        this.action = action;
    }

}
