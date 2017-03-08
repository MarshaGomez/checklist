"use strict";
var Issue = (function () {
    function Issue(values) {
        if (values === void 0) { values = {}; }
        this.name = '';
        this.description = '';
        this.resolved = false;
        Object.assign(this, values);
    }
    return Issue;
}());
exports.Issue = Issue;
//# sourceMappingURL=issue.js.map