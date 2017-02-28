"use strict";
var Task = (function () {
    function Task(values) {
        if (values === void 0) { values = {}; }
        this.name = '';
        this.description = '';
        this.completed = false;
        Object.assign(this, values);
    }
    return Task;
}());
exports.Task = Task;
//# sourceMappingURL=task.js.map