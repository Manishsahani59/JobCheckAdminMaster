export interface LoginModel {
    LoginName?: string;
    UserPassword?: string;
    userType?: string;
    sKey?:string;
}


export interface UserProfile {
    UserId: number;
    UserFirstName: string;
    UserMiddleName: string;
    UserLastName: string;
    LoginName: string;
    UserPassword: string;
    EmailId: string;
    MobileNo: number;
    RoleId: number;
    IsActive: number;
    UserType: number;
    Errormsg: number;
    message :string;

    }  