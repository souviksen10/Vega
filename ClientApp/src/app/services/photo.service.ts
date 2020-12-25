import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class PhotoService {
    
    constructor(private http: HttpClient) { }
 
    upload(vehicleId: any, photo) {
        let formData = new FormData(); 
        formData.append('file', photo);

        return this.http.post(`api/vehicles/${vehicleId}/photos`,formData);
    }

    getPhotos(vehicleId) {
        return this.http.get(`api/vehicles/${vehicleId}/photos`);
    }
}