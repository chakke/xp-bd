import { Http, HttpModule } from "@angular/http";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export class FotunesLoadData {
    constructor(private http: Http) {
    }

    getDataFROMJSON(){
        return this.http.get("./assets/fotunes/data/data.json")
        .map((res: any) => res.json());
    }
    getDataDetailFROMJSON(){
        return this.http.get("./assets/fotunes/data/ft_detail.json")
        .map((res: any) => res.json());
    }
}