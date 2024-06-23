import { Injectable } from '@angular/core';
import { jwtDecode }  from 'jwt-decode';

@Injectable()
export class DecodeTokenService {
  tokenPayload: any;
  constructor() {
  }

  decodeToken() {
    let token = localStorage.getItem('token');
    if(token){
      this.tokenPayload = jwtDecode(token);
      localStorage.setItem('emailId', this.tokenPayload.emailId);
      return this.tokenPayload;
    }
  }
  getRole() {
    return this.tokenPayload.role;
  }
  getEmailId() {
    return localStorage.getItem('emailId');
  }
  getUserId() {
    return this.tokenPayload.userId;
  }

}
