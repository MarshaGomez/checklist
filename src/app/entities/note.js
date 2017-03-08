"use strict";
var Note = (function () {
    function Note(values) {
        if (values === void 0) { values = {}; }
        this.name = '';
        this.text = '';
        Object.assign(this, values);
    }
    return Note;
}());
exports.Note = Note;
//# sourceMappingURL=note.js.map