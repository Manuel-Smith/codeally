"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatFailOutput = void 0;
const formatFailOutput = (tap) => {
    let output = `FAILED TEST LOG\n`;
    tap.failed.forEach((fail) => {
        const details = fail.details ? `\n${fail.details}\n` : '';
        const logs = fail.logs ? `\n${fail.logs.join('\n')}\n` : '';
        const result = `${logs}  ✘ ${fail.message}\n${details}`;
        output += result;
    });
    return output;
};
exports.formatFailOutput = formatFailOutput;
//# sourceMappingURL=formatOutput.js.map