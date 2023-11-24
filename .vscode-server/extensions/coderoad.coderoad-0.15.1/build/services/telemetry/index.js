"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onEvent = exports.onError = exports.deactivate = exports.activate = void 0;
const vscode_extension_telemetry_1 = require("vscode-extension-telemetry");
const environment_1 = require("../../environment");
const logger_1 = require("../logger");
let reporter;
const activate = (subscribeFn) => {
    (0, logger_1.default)(environment_1.EXTENSION_ID, environment_1.VERSION, environment_1.INSTRUMENTATION_KEY);
    reporter = new vscode_extension_telemetry_1.default(environment_1.EXTENSION_ID, environment_1.VERSION, environment_1.INSTRUMENTATION_KEY);
    subscribeFn(reporter);
};
exports.activate = activate;
const deactivate = () => {
    if (reporter) {
        reporter.dispose();
    }
};
exports.deactivate = deactivate;
const onError = (error, properties, measurements) => {
    (0, logger_1.default)(error, properties, measurements);
    if (reporter) {
        reporter.sendTelemetryException(error, properties, measurements);
    }
};
exports.onError = onError;
const onEvent = (eventName, properties, measurements) => {
    (0, logger_1.default)(eventName, properties, measurements);
    if (reporter) {
        reporter.sendTelemetryEvent(eventName, properties, measurements);
    }
};
exports.onEvent = onEvent;
//# sourceMappingURL=index.js.map