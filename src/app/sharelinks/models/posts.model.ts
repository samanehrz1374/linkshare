export interface IPosts {
    postId:number;
    userName:string;
    firstName:string;
    lastName:string;
    userProfile:string;
    title:string;
    link:string;
    discription:string;
    image:string;
    likes:number;
    tags:[];
    date:string;
    time:number;
    comments:[];
    isActive:true;

}

export interface IAddPost{
    userName:string,
    link:string,
    discription:string,
    image:string,
    title:string,
    Tags:string[],
    date:number,
    time:number,
}
