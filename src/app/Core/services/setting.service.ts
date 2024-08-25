import { Injectable } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { UserService } from './user.service';
import { ResponseBase } from 'src/app/shared/class/class';
import Axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  constructor(
    public layoutService: LayoutService,
    public userService: UserService
  ) {}

  // async Add(data: ParentTransactionRequest) {
  //   const config = {
  //     headers: {
  //       'Accept-Language': this.layoutService.config.lang,
  //       Authorization: 'Bearer ' + this.userService.currentUser.token,
  //     },
  //   };

  //   const apiUrl = `${this.layoutService.baseApiUrl}/api/ParentTransaction`;

  //   return Axios.post<ParentTransactionResponse>(apiUrl, data, config)
  //     .then((response) => {
  //       return response.data;
  //     })
  //     .catch((error) => {
  //       return error.response.data;
  //     });
  // }

  async Search(filter: SettingSearchRequest) {
    const config = {
      headers: {
        'Accept-Language': this.layoutService.config.lang,
        Authorization: 'Bearer ' + this.userService.currentUser.token,
      },
    };

    const apiUrl = `${
      this.layoutService.baseApiUrl
    }/api/Setting?${this.layoutService.Filter(filter)}`;

    return Axios.get(apiUrl, config)
      .then((response) => {
        console.log('Setting response : ', response);

        return response.data;
      })
      .catch((error) => {
        console.log('rr', error);
        return error.response.data;
      });
  }
}

interface SettingSearchRequest {
  id?: string;
  merchantIDFK?: string;

  dateFrom?: string;
  dateTo?: string;
  pageSize?: string;
  pageIndex?: string;
}

interface SettingResponse extends ResponseBase {
  id?: string;
  merchantIDFK?: string;
  sellingRatePerPoint?: string;
  creationDate?: string;
  updateDate?: string;
  isDelete?: string;
}
