export class Task {
    id: string;
    description: string = '';
    complete: boolean = false;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}