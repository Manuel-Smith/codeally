"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onOpenLogs = void 0;
const output_1 = require("../services/testRunner/output");
const onOpenLogs = async (action) => {
    const channel = action.payload.channel;
    await (0, output_1.showOutput)(channel);
};
exports.onOpenLogs = onOpenLogs;
exports.default = exports.onOpenLogs;
//# sourceMappingURL=onOpenLogs.js.map