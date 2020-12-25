import { Vehicle, SaveVehicle } from './../../model/vehicle';
import { VehicleService } from '../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import * as _ from 'underscore';


@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes:any[];
  features:any[];
  models:any[];
  vehicle:SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,        
    features: [],
    contact:{
      contactEmail:'',
      contactName:'',
      contactPhone:''
    }
  };
  constructor(
    private route: ActivatedRoute, private router: Router,
    private vehicleService: VehicleService, private toastrService: ToastrService) { 
      this.route.params.subscribe(p => this.vehicle.id = +p['id'] || 0);
    }

  ngOnInit() {    
    let sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures()      
    ];

    if(this.vehicle.id)
      sources.push(this.vehicleService.getVehicle(this.vehicle.id));
    
    forkJoin(sources)
      .subscribe((data: any[]) =>{
        this.makes = data[0];
        this.features = data[1];

        if(this.vehicle.id){
          this.setVehicle(data[2]);
          this.populateModel();
        }          
      },err => {
        if(err.status == 404)
         this.router.navigate(['/']);
      }
    )
  }

  private setVehicle(v: Vehicle){  
    this.vehicle.id = v.id;  
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = _.pluck(v.features,'id');   
  }

  onMakeChange(){
    this.populateModel();
    delete this.vehicle.modelId;
  } 

  private populateModel(){
    let selectedMakeObj = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMakeObj?.models;
  }

  onFeatureChange(featureId,$event){
    if($event.target.checked){
      this.vehicle.features.push(featureId);
    }
    else{
      let index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index,1);
    }
  }

  onSubmit(){   
    var result$ = (this.vehicle.id) ? this.vehicleService.update(this.vehicle) : this.vehicleService.create(this.vehicle); 
    result$.subscribe((vehicle:any) => {
      this.toastrService.success('Vehicle Updated successfully.','Success'
      ,{
        closeButton: true,
        timeOut: 5000
      });   
    this.router.navigate(['/vehicles/', vehicle.id])
    });   
  }

  onDelete(){
    if(confirm('Are you sure?')){
      this.vehicleService.delete(this.vehicle.id)
      .subscribe(x => this.router.navigate(['/']));
    }
  }
}
