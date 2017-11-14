
export interface UH{
  olds : string;
  month: string;
  hanh: string;
}
export class Fotunes {
  name: string;
  nameInVN: string;
  id: number;
  means: string;
  analysis: string;
  advice: string;
  UH: UH;
  more: string;
  imageSrc: string;
  constructor(opts?: any) {
    this.setDefault();
    if(opts){
      this.parseData(opts);
    }
  }
  setID(id: number){
    this.id = id;
  }
  setDefault(){
    this.name = "name";
    this.nameInVN = "name in vn (name in viet nam)";
    this.id = 0;
    this.means = "means";
    this.analysis = "analysis";
    this.advice = "advice";
    this.UH = {
      olds: "Tuoi",
      month: "thang",
      hanh: "hanh"
    };
    this.more = "more";
    this.imageSrc = "./assets/fotunes/image/text/text_0.png";
  }
  copy(fotune: Fotunes){
    this.name = fotune.name;
    this.nameInVN = fotune.nameInVN;
    this.means = fotune.means;
    this.analysis = fotune.analysis;
    this.advice = fotune.advice;
    this.UH = fotune.UH;
    this.more = fotune.more;
    this.imageSrc = fotune.imageSrc;
  }
  parseData(opts: any) {
    if (opts.name) this.name = opts.name;
    if (opts.nameInVN) this.nameInVN = opts.nameInVN;
    if (opts.id) this.id = parseInt(opts.id);
    if (opts.means) this.means = opts.means;
    if (opts.analysis) this.analysis = opts.analysis;
    if (opts.advice) this.advice = opts.advice;
    if (opts.UH) this.parseUH(opts.UH);
    if (opts.more) this.more = opts.more;
    if (opts.imageSrc)this.imageSrc = opts.imageSrc;
  }
  dem : number = 0;
  parseUH(data: string){
    let stringOlds : string =  data.split("Tháng")[0].split("Tuổi")[1];
    let stringMonth: string = data.split("Hành")[0].split("Tháng")[1];
    let stringHanh : string = data.split("Hành")[1];
    if(stringOlds && stringOlds.length>0){
      if(stringOlds.charAt(0)==":"){
        this.UH.olds = stringOlds.substring(2);
      }else{
        this.UH.olds = stringOlds.substring(1);
      }
    }    
    if(stringMonth && stringMonth.length>0){
      if(stringMonth.charAt(0)==":"){
        this.UH.month= stringMonth.substring(2);
      }else{
        this.UH.month= stringMonth.substring(1);
      }
    }
    if(stringHanh && stringHanh.length>0){
      if(stringHanh.charAt(0)==":"){
        this.UH.hanh= stringHanh.substring(2);
      }else{
        this.UH.hanh= stringHanh.substring(1);
      }
    }
  }
}
