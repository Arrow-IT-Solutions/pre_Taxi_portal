import { Injectable } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';

import { UserService } from './user.service';
import Axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ConstantService {
  constructor(
    public layoutService: LayoutService,
    public userService: UserService
  ) {}

  async Search(name: string) {
    const config = {
      headers: {
        'Accept-Language': this.layoutService.config.lang,
        Authorization: 'Bearer ' + this.userService.currentUser.token,
      },
    };

    const apiUrl = `${
      this.layoutService.baseApiUrl
    }/api/constants?${this.layoutService.Filter({ enumName: name })}`;

    return Axios.get(apiUrl, config)
      .then((response) => {
        console.log('r', response);

        return response.data;
      })
      .catch((error) => {
        console.log('rr', error);
        return error.response.data;
      });
  }
}

export interface ConstantResponse {
  key?: string;
  value?: string;
  color?: string;
}
