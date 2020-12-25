import { VehicleService } from '../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  private readonly PAGE_SIZE = 3;
  queryResult:any={};
  //allVehicles:Vehicle[];
  makes;
  query:any = {
    pageSize:this.PAGE_SIZE
  };
  columns=[
    {title:'Id', key:'id'},
    {title:'Make', key:'make'},
    {title:'Model', key:'model'},
    {title:'Contact Name', key:'contactName'}
    
  ]
  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.vehicleService.getMakes()
      .subscribe(makes => this.makes = makes);

    // this.vehicleService.getVehicles()
    //   .subscribe(vehicles => this.vehicles = this.allVehicles = vehicles);

   this.populateVehicles(); 
  }

  onFilterChange(){
    // let vehicles = this.allVehicles;
    // if(this.filter.makeId)
    //   vehicles = this.allVehicles.filter(v => v.make.id == this.filter.makeId);

    // this.vehicles = vehicles;
    this.query.page = 1;
    this.populateVehicles(); 
  }

  private populateVehicles(){
    this.vehicleService.getVehicles(this.query)
      .subscribe(result => this.queryResult = result);  
     // .subscribe(vehicles => this.vehicles = this.allVehicles = vehicles);  
  }

  onFilterReset(){
    this.query = {
      page : 1,
      pageSize:this.PAGE_SIZE
    };
    this.populateVehicles(); 
  }
  
  sortBy(columnName){
    if(this.query.sortBy === columnName){
      this.query.isSortAscending = !this.query.isSortAscending;
    }
    else{
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateVehicles();
  }

  onPageChange(page){
    this.query.page = page;
    this.populateVehicles();
  }
}
