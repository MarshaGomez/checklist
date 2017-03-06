import { Task } from './task';

export class Checklist {
    id: string;
    name: string = '';
    tasks: Array<Task>;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}