export class UserData {
    public id: string;
    public name: string;
    public email: string;
    public phone: number;
    public address: string;
    public description: string;

    constructor() {
        this.id = '';
        this.name = '';
        this.email = '';
        this.phone = 0;
        this.address = '';
        this.description = '';
    }
}
