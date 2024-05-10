import { Role, User } from "../types/UserType";

const URL: string = 'http://localhost:3000';

export default class AuthApi {
    DbName:string = 'users';
    DbSet:Array<User> = this.GetDbSet();

    async SignIn(username:string, password:string): Promise<{token:string, refreshToken:string} | null> {
        const user = this.GetByUsername(username);
        if (user == undefined) return null;
        if (user.password != password) return null;
        return await getToken();
    }

    async RefreshToken(refreshToken:string): Promise<{token:string, refreshToken:string}> {
        return await getRefreshedToken(refreshToken);;
    }

    private GetByUsername(username: string): User | undefined {
        return this.DbSet.find(p => p.username == username);
    }

    async GetById(id:string): Promise<User> {
        return this.DbSet.find(p => p.id == id)!;
    }

    async GetAll(): Promise<Array<User>> {
        return this.DbSet;
    }


    private GetDbSet() : Array<User> {
        let users:Array<User> = [];

        let admin:User = {
            id: "abde511c-8888-49ab-bca7-3126da94c8b0",
            name: "John",
            surname: "Kowalski",
            role: Role.Admin,
            username: "johnk",
            password: "Admin123"
        }

        let devops:User = {
            id: "a5e12bc0-4b6c-48bb-9a6c-f1c4b7e16b95",
            name: "Paul",
            surname: "Doe",
            role: Role.DevOps,
            username: "pauld",
            password: "Devops123"
        }

        let developer:User = {
            id: "ab53e57b-79dc-466b-9083-63208f472c2d",
            name: "Adam",
            surname: "Nowak",
            role: Role.Developer,
            username: "adamn",
            password: "Developer123"
        }

        users.push(admin, devops, developer);
        return users;
    }

    private UpdateApi(): void {
        localStorage.setItem(this.DbName, JSON.stringify(this.DbSet));
    }
}

async function getToken() : Promise<{token:string, refreshToken:string}> {
    const response = await fetch(`${URL}/token`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "exp": "6000"
        }
    })
    if(!response.ok) throw new Error('Failed to fetch token.');
    return await response.json();
}

async function getRefreshedToken(refreshToken:string) : Promise<{token:string, refreshToken:string}> {
    const response = await fetch(`${URL}/refreshtoken`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "exp": "6000"
        },
        body: JSON.stringify({ refreshToken: refreshToken})
    })
    if(!response.ok) throw new Error('Failed to fetch token.');
    return await response.json();
}