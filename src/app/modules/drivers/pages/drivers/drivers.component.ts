import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { AddDriverComponent } from '../add-driver/add-driver.component';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent {

  constructor(public layoutService:LayoutService)
  {}




  OpenDialog() {
    
    var component = this.layoutService.OpenDialog(AddDriverComponent, "Add Driver");

    component.OnClose.subscribe(() => {
      //this.FillData();
    });
  }

}
