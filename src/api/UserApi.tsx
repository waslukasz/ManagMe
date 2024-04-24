import { User } from "../types/UserType";

export default class UserApi {
    DbName:string = 'users';
    DbSet:Array<User> = this.GetDbSet();

    private GetDbSet() : Array<User> {
        let result:any = localStorage.getItem(this.DbName);
        if (result == null) {
            return [] as Array<User>;
        } else {
            result = JSON.parse(result) as Array<User>
        }
        return result;
    }

    private UpdateApi(): void {
        localStorage.setItem(this.DbName, JSON.stringify(this.DbSet));
    }
}