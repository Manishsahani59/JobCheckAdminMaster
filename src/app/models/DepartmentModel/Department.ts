export class Department{
    actionType:string;
    departmentName:string;
    departmentCode:string;
    userId:number;
}

export class UpdateDeleteDepartment{
    actionType:string;
    departmentId:number;
    departmentName:string;
    departmentCode:string;
    userId:number;
}