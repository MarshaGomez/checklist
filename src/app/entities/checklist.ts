import { Task } from './task';

export class Checklist {
    id: string;
    title: string = '';
    tasks: Array<Task>;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}