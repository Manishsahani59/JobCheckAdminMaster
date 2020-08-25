export class DistrictRequest
{
  actionType: string;
  stateId:number;
  districtName: string;
  districtCode: string;
  userId: number;
}

export class UpdateDeleteDistrict{
  actionType:string;
  districtId: Number;
  stateId: Number;
  districtName: string;
  districtCode: string;
  userId: Number;
}