import { Task } from './task';

export class Todo {
    id: string;
    title: string = '';
    tasks: Array<Task>;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}