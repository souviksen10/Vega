import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from '../model/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly vehiclesEndpoint = '/api/vehicles';
  constructor(private http: HttpClient) { }

  getMakes(){
    return this.http.get('/api/makes') as any;
  }

  getFeatures(){
    return this.http.get('/api/features') as any;
  }

  create(vehicle){
    return this.http.post(this.vehiclesEndpoint,vehicle);
  }

  getVehicle(id){
    return this.http.get(this.vehiclesEndpoint +'/'+ id);
  }

  getVehicles(filter){
    return this.http.get(this.vehiclesEndpoint + '?' + this.toQueryString(filter)) as any;
  }
  private toQueryString(obj){
    let parts = [];

    for (let key in obj) {
      let value = obj[key];
      if(value!=null || value!=undefined )
        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }
    return parts.join('&');  
  }

  update(vehicle){
    return this.http.put(this.vehiclesEndpoint +'/'+ vehicle.id,vehicle);
  }

  delete(id){
    return this.http.delete(this.vehiclesEndpoint +'/'+ id);
  }
}
