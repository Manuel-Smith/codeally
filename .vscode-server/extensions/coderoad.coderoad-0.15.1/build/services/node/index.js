"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = exports.removeFile = exports.exists = exports.exec = void 0;
const child_process_1 = require("child_process");
const fs = require("fs");
const path_1 = require("path");
const util_1 = require("util");
const environment_1 = require("../../environment");
const asyncExec = (0, util_1.promisify)(child_process_1.exec);
const asyncRemoveFile = (0, util_1.promisify)(fs.unlink);
const asyncReadFile = (0, util_1.promisify)(fs.readFile);
const exec = (params) => {
    const cwd = (0, path_1.join)(environment_1.WORKSPACE_ROOT, params.dir || '');
    return asyncExec(params.command, { cwd });
};
exports.exec = exec;
const exists = (...paths) => {
    return fs.existsSync((0, path_1.join)(environment_1.WORKSPACE_ROOT, ...paths));
};
exports.exists = exists;
const removeFile = (...paths) => {
    return asyncRemoveFile((0, path_1.join)(environment_1.WORKSPACE_ROOT, ...paths));
};
exports.removeFile = removeFile;
const readFile = (...paths) => {
    return asyncReadFile((0, path_1.join)(...paths));
};
exports.readFile = readFile;
//# sourceMappingURL=index.js.map