import { NgModule } from '@angular/core';
import { LoginComponent } from './page/login/login.component';
import { AuthRoutingModule } from './auth.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import {
  RequestBase,
  ResponseBase,
  SearchRequestBase,
} from '../../shared/class/class';

@NgModule({
  declarations: [LoginComponent],
  imports: [AuthRoutingModule, SharedModule],
})
export class AuthModule {}

export interface AuthRequest {
  userName: string;
  password: string;
}

export interface CurrentUser {
  userUUID: string;
  userName: string;
  userType:string,
  token:string,
  loggedInUser:string
}

export interface resetPasswordRequest {
  userNameType: string;
  userName: string;
}

export interface UserRequest extends RequestBase {
  id?: string;
  nameEn?: string;
  nameAr?: string;
  type?: string;
  userNameType?: string;
  email?: string;
  phone?: string;
  gender?: string;
  address?: string;
  username?: string;
  password?: string;
  status?: string;
  link?: string;
  verificationCode?: string;
  isVerified?: string;
  // clientRequest? :ClientRequest
}

export interface UserResponse extends ResponseBase {
  id?: string;
  nameEn?: string;
  nameAr?: string;
  type?: string;
  typeValue?: string;
  userNameType?: string;
  userNameTypeValue?: string;
  phone?: string;
  gender?: string;
  genderValue?: string;
  address?: string;
  email?: string;
  username?: string;
  passwordHash?: string;
  statusValue?: string;
  link?: string;
  verificationCode?: string;
  isVerified?: string;
  isVerifiedValue?: string;
  creationDate?: string;
  updateDate?: string;
  isDelete?: string;
  // clientResponse?: ClientResponse;
  pageIndex?: string;
  pageSize?: string;
  totalRecords?: string;
}

export interface UserSearchRequest extends SearchRequestBase {
  id?: string;
  birthDate?: string;
  // deviceType?: string;
  type?: string;
  name?: string;
  phone?: string;
  email?: string;
  // status?: string;
}

// export interface UserRequest
// {
//   id?:string ,
//   namear?:string ,
//   nameEn?:string ,
//   birthdate?:string ,
//   email?:string ,
//   type?:string ,
//   userNameType?:string,
//   phone?:string,
//   gender?:string,
//   password?:string,
//   status?:string,
//   isVerified?:string,
//   clientRequest?:ClientRequest

// }

// export interface UserResponse  extends ResponseBase
// {
//    nameEn?:string ,
//    nameAr ?: string
//    type? : string
//    typeValue? : string,
//    userNameType?:string,
//    userNameTypeValue?:string,
//    phone?:string,
//    gender?:string,
//    genderValue?:string,
//    address?:string,
//    email?:string,
//    username?:string,
//    status?:string,
//    statusValue?:string,
//    link?:string,
//    verificationCode?:string,
//    isVerified?:string,
//    clientResponse?:ClientResponse,

// }
