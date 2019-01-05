import { Injectable } from "@angular/core";
import { User } from "./model/user.model";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UserRestService {

    private restUrl = "http://localhost:8080";

    constructor(private http: HttpClient) {}

    public createUser(user) {
        return this.http.post<User>(this.restUrl + "/createUser", user);
      }

}