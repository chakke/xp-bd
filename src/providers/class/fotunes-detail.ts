export class FotunesDetail{
    Id: number;
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    h5: string;
    h6: string;
    means: string;
    lessons: string;
    constructor(opts?: any){
        this.Id = 0;
        this.h1 = "";
        this.h2 = "";
        this.h3 = "";
        this.h4 = "";
        this.h5 = "";
        this.h6 = "";
        this.means = "";
        this.lessons = "";
        if(opts){
            this.parseData(opts);
        }
    }
    setID(id : number){
        this.Id = id;
    }
    parseData(opts: any){
        if(opts.Id) this.Id = parseInt(opts.Id);
        if(opts.h1) this.h1 = opts.h1;
        if(opts.h2) this.h2 = opts.h2;
        if(opts.h3) this.h3 = opts.h3;
        if(opts.h4) this.h4 = opts.h4;
        if(opts.h5) this.h5 = opts.h5;
        if(opts.h6) this.h6 = opts.h6;
        if(opts.means) this.means = opts.means;
        if(opts.lessons) this.lessons = opts.lessons;
    }

    updateINFO(opts: any){
        if(opts.h1) this.h1 = opts.h1;
        if(opts.h2) this.h2 = opts.h2;
        if(opts.h3) this.h3 = opts.h3;
        if(opts.h4) this.h4 = opts.h4;
        if(opts.h5) this.h5 = opts.h5;
        if(opts.h6) this.h6 = opts.h6;
        if(opts.means) this.means = opts.means;
        if(opts.lessons) this.lessons = opts.lessons;
    }
}