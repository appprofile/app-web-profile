export class Courses {
    public id: string;
    public course: string;
    public institute: string;
    public from: string;
    public to: string;
    public description: string;
    // Not mappep
    public index: number;

    public constructor() {
        this.id = '';
        this.course = '';
        this.institute = '';
        this.from = '';
        this.to = '';
        this.description = '';
    }
}
