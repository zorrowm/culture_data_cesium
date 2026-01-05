interface ISystemItemUser
{
    id:string,
    name:string,
    url?:string,
    logo?:string,
    tag?:string,
    diskid?:string,
    children?:Array<ISystemRelUser>,
}

interface ISystemRelUser
{
    sid:string,
    userid:string,
    vid:string,
    user_level?:number,
    username?:string
}

export {ISystemItemUser,ISystemRelUser};
   