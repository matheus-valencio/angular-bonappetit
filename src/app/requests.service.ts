import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';

interface Auth {
  token: string;
  username: string;
  profile: Array<string>;
}

@Injectable()
export class RequestsService {
  name = 'My spring boot app';
  site = 'http://localhost:8080';
  login = 'admin'; //admin
  password = 'admin'; //admin

  auth = null;
  header = null;

  constructor(private http: HttpClient, private route: Router) {}

  postLogin(psw, login) {
    this.http
      .post<Auth>(this.site + '/login', {
        login: login,
        senha: psw,
      })
      .subscribe((data) => {
        this.auth = data;
        this.header = {
          headers: new HttpHeaders().set(
            'Authorization',
            `Bearer ${this.auth.token}`
          ),
        };

        if (this.auth.profile[0] == ['ADMIN']) {
          this.route.navigate(['/pageadmin']);
        }
      });
  }

  ngOnInit() {}
}
