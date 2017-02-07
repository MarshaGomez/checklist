export class Task {
    id: string;
    description: string = '';
    completed: boolean = false;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}