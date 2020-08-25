export class AddlLocation{
    actionType:string;
    DistrictId:number;
    stateId:number;
    locationName:string;
    locationCode:string;
    userId:number;
} 


export class UpdateDeleteLocation{
    actionType:string;
    locationId:number;
    DistrictId:number;
    stateId:number;
    locationName:string;
    locationCode:string;
    userId:number;
}