import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'          

})

export class HomeService {
    API_BASE_URL = 'https://todobackend.onrender.com'

    constructor(private http: HttpClient) {}   
    
    
        getuserCategory(data:any):Observable<any>{
           return this.http.post(this.API_BASE_URL + '/getcategory',data)

        }

        addcategory(data:any):Observable<any>{
          return this.http.post(this.API_BASE_URL + '/category',data)
        }   

        getuserTasks(data:any):Observable<any>{
            return this.http.post(this.API_BASE_URL + '/gettasks',data)
        }
        addUserTask(data:any):Observable<any>{
            return this.http.post(this.API_BASE_URL + '/addtask',data)
        }
}
