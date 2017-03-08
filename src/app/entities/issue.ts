export class Issue {
    id: string;
    name: string = '';
    description: string = '';
    resolved: boolean = false;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}