export interface Vehicle{
    id: number;
    model: KeyValuePair;
    make: KeyValuePair;
    isRegistered: boolean;
    contact: Contact;
    lastUpdate: string;
    features: KeyValuePair[];
}

export interface SaveVehicle{
    id: number;
    makeId: number;
    modelId: number;
    isRegistered: boolean;   
    contact: Contact;    
    features: number[];
}

export interface KeyValuePair{
    id: number;
    name: string;
}

export interface Contact{
    contactName: string;
    contactPhone: string;
    contactEmail: string;
}