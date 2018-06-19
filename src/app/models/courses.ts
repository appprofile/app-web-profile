export class Courses {
    public id: number;
    public name: string;
    public institute: string;
    public dateIni: string;
    public dateEnd: string;
    public description: string;

    public constructor() {
        this.id = 0;
        this.name = '';
        this.institute = '';
        this.dateIni = '';
        this.dateEnd = '';
        this.description = '';
    }
}
