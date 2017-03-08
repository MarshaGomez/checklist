export class Note {
    id: string;
    name: string = '';
    text: string = '';

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}