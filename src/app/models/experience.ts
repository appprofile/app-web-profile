export class Experience {
    public id: string;
    public title: string;
    public company: string;
    public description: string;
    public created: string;
    public from: string;
    public to: string;
    public current: boolean;
    public updated: string;
    // Not mapped
    public index: number;

    public constructor() {
        this.id = '';
        this.title = '';
        this.company = '';
        this.description = '';
        this.from = '';
        this.to = '';
    }
}
