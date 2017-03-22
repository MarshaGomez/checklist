import { Task } from './task';

export class Checklist {
    id: string;
    name: string = '';
    tasks: Task[];
    print: false;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}