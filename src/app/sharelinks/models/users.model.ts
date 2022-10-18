export interface IUser{
    userName:string;
    userId:number;
    userProfile:string;
    firstName:string;
    lastName:string;
    password:string;
    email:string;
    salt:string;
    isActive:boolean;
    posts:number;
    likes:number;
}