import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Sensor } from '../../../models/sensors.model';
import { SensorsService } from '../../../services/sensors.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  headers: string[] = ['#','Name', 'Active', 'minval', 'maxval', 'lat', 'long','actions'];
  allSensors:Sensor[];
  aSensor:Sensor;

  navigationExtras: NavigationExtras = {
    state: {
      sensor:null
    }
  }

  constructor(
    private sensorService: SensorsService,
    private router: Router,
  ) {
    this.retrieveSensors();
   }

  ngOnInit(): void {
  }

  goBackToList():void {
    this.router.navigate(['list']);
  }

  retrieveSensors() {
    this.sensorService.getAllSensors().subscribe(req => {
      this.allSensors = req.data.doc
      console.log(this.allSensors)
    });
  }

  getSensor(id) {
    this.sensorService.getSensorById(id).subscribe(req => {
      this.aSensor = req.data.doc.name;
      console.log(this.aSensor)
    })
  }

  onGoToEdit(item:any):void {
    this.navigationExtras.state.sensor = item
    this.router.navigate(['edit'], this.navigationExtras);
  }

  onGoToDetail(item:any):void {
    this.navigationExtras.state.sensor = item
    this.router.navigate(['details'], this.navigationExtras);
  }

  async sensorDelete(id:string):Promise<void> {
    try {
      await this.sensorService.onDelete(id).subscribe((res) => {
        alert(`Sensor with id ${id} deleted!`);
      })
    } catch (error) {
      console.error(error)
    }
  }
}
