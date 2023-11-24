"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommands = exports.send = exports.COMMANDS = void 0;
const testRunner_1 = require("./services/testRunner");
const create_1 = require("./services/webview/create");
const hooks = require("./services/hooks");
const logger_1 = require("./services/logger");
const channel_1 = require("./channel");
exports.COMMANDS = {
    START: 'coderoad.start',
    CONFIG_TEST_RUNNER: 'coderoad.config_test_runner',
    RUN_TEST: 'coderoad.run_test',
    SET_CURRENT_POSITION: 'coderoad.set_current_position',
    ENTER: 'coderoad.enter',
};
let sendToClient = (action) => {
};
const send = (action) => {
    (0, logger_1.default)(`EXT TO CLIENT: "${typeof action === 'string' ? action : action.type}"`);
    if (action)
        sendToClient(action);
};
exports.send = send;
const createCommands = (commandProps) => {
    const { extensionPath, workspaceState } = commandProps;
    let webview;
    let currentPosition;
    let testRunner;
    const channel = new channel_1.default(workspaceState);
    const start = async () => {
        if (webview && webview.state.loaded) {
            webview.createOrShow();
        }
        else {
            webview = await (0, create_1.default)({
                extensionPath,
                channel,
            });
            sendToClient = webview.send;
        }
    };
    start();
    return {
        [exports.COMMANDS.START]: start,
        [exports.COMMANDS.CONFIG_TEST_RUNNER]: async ({ data, alreadyConfigured, }) => {
            if (!alreadyConfigured) {
                const setupActions = data.config.setup;
                if (setupActions) {
                    hooks.onInit(setupActions, data.id);
                }
            }
            testRunner = (0, testRunner_1.default)(data, {
                onSuccess: (position) => {
                    (0, logger_1.default)('test pass position', position);
                    channel.context.position.set({ ...position, complete: true });
                    (0, exports.send)({ type: 'TEST_PASS', payload: { position: { ...position, complete: true } } });
                },
                onFail: (position, failSummary) => {
                    (0, exports.send)({ type: 'TEST_FAIL', payload: { position, fail: failSummary } });
                },
                onError: (position) => {
                    const message = 'Error with test runner';
                    (0, exports.send)({ type: 'TEST_ERROR', payload: { position, message } });
                },
                onRun: (position) => {
                    (0, exports.send)({ type: 'TEST_RUNNING', payload: { position } });
                },
                onLoadSubtasks: ({ summary }) => {
                    (0, exports.send)({ type: 'LOAD_SUBTASK_RESULTS', payload: { summary } });
                },
            });
        },
        [exports.COMMANDS.SET_CURRENT_POSITION]: (position) => {
            currentPosition = position;
            channel.context.position.set(position);
        },
        [exports.COMMANDS.RUN_TEST]: ({ subtasks, callbacks, } = {}) => {
            testRunner({ position: currentPosition, onSuccess: callbacks === null || callbacks === void 0 ? void 0 : callbacks.onSuccess, subtasks });
        },
        [exports.COMMANDS.ENTER]: () => {
            (0, exports.send)({ type: 'KEY_PRESS_ENTER' });
        },
    };
};
exports.createCommands = createCommands;
//# sourceMappingURL=commands.js.map