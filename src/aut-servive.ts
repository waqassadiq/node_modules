import { ThrowStmt } from "@angular/compiler";
import { resolve } from "url";

// fake service for now
export class AuthService{
    private loggedIn = false;

    isAuthenticated() {
        const promise = new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.loggedIn);
                }, 800)
            }
        );
        return promise;
    }

    logIn(){
        this.loggedIn = true;
    }

    logout(){
        this.loggedIn = false;
    }
}