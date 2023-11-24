"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onTutorialComplete = exports.onLevelComplete = exports.onStepComplete = exports.onError = exports.onReset = exports.onSolutionEnter = exports.onSetupEnter = exports.onLevelEnter = exports.onInit = void 0;
const git = require("../git");
const commits_1 = require("./utils/commits");
const watchers_1 = require("./utils/watchers");
const openFiles_1 = require("./utils/openFiles");
const runCommands_1 = require("./utils/runCommands");
const runVSCodeCommands_1 = require("./utils/runVSCodeCommands");
const telemetry = require("../telemetry");
const onTest_1 = require("../../actions/onTest");
const environment_1 = require("../../environment");
const webhooks = require("./webhooks");
const onInit = async (actions, tutorialId) => {
    await (0, commits_1.loadCommits)(actions === null || actions === void 0 ? void 0 : actions.commits);
    await (0, runCommands_1.default)(actions === null || actions === void 0 ? void 0 : actions.commands);
    await (0, runVSCodeCommands_1.default)(actions === null || actions === void 0 ? void 0 : actions.vscodeCommands);
    webhooks.onInit({
        tutorialId,
        coderoadVersion: environment_1.VERSION,
    });
};
exports.onInit = onInit;
const onLevelEnter = async (actions) => {
    await (0, commits_1.loadCommits)(actions === null || actions === void 0 ? void 0 : actions.commits);
    await (0, runCommands_1.default)(actions === null || actions === void 0 ? void 0 : actions.commands);
};
exports.onLevelEnter = onLevelEnter;
const onSetupEnter = async (actions) => {
    await (0, commits_1.loadCommits)(actions === null || actions === void 0 ? void 0 : actions.commits);
    await (0, openFiles_1.default)(actions === null || actions === void 0 ? void 0 : actions.files);
    await (0, watchers_1.loadWatchers)(actions === null || actions === void 0 ? void 0 : actions.watchers);
    await (0, runCommands_1.default)(actions === null || actions === void 0 ? void 0 : actions.commands);
    await (0, runVSCodeCommands_1.default)(actions === null || actions === void 0 ? void 0 : actions.vscodeCommands);
};
exports.onSetupEnter = onSetupEnter;
const onSolutionEnter = async (actions) => {
    await git.clear();
    await (0, commits_1.loadCommits)(actions === null || actions === void 0 ? void 0 : actions.commits);
    await (0, openFiles_1.default)(actions === null || actions === void 0 ? void 0 : actions.files);
    await (0, runCommands_1.default)(actions === null || actions === void 0 ? void 0 : actions.commands);
    await (0, runVSCodeCommands_1.default)(actions === null || actions === void 0 ? void 0 : actions.vscodeCommands);
    await (0, onTest_1.runTest)();
};
exports.onSolutionEnter = onSolutionEnter;
const onReset = async (actions, tutorialId) => {
    await (0, watchers_1.resetWatchers)();
    await (0, runCommands_1.default)(actions === null || actions === void 0 ? void 0 : actions.commands);
    await (0, runVSCodeCommands_1.default)(actions === null || actions === void 0 ? void 0 : actions.vscodeCommands);
    webhooks.onReset({
        tutorialId,
    });
};
exports.onReset = onReset;
const onError = async (error) => {
    telemetry.onError(error);
};
exports.onError = onError;
const onStepComplete = async ({ tutorialId, levelId, stepId, }) => {
    git.saveCommit(`Save progress: ${stepId}`);
    telemetry.onEvent('step_complete', { tutorialId, stepId, levelId, version: environment_1.VERSION });
    webhooks.onStepComplete({
        tutorialId,
        levelId,
        stepId,
    });
};
exports.onStepComplete = onStepComplete;
const onLevelComplete = async ({ tutorialId, levelId, }) => {
    telemetry.onEvent('level_complete', { tutorialId, levelId, version: environment_1.VERSION });
    webhooks.onLevelComplete({
        tutorialId,
        levelId,
    });
};
exports.onLevelComplete = onLevelComplete;
const onTutorialComplete = async ({ tutorialId }) => {
    telemetry.onEvent('tutorial_complete', { tutorialId, version: environment_1.VERSION });
    webhooks.onTutorialComplete({
        tutorialId,
    });
};
exports.onTutorialComplete = onTutorialComplete;
//# sourceMappingURL=index.js.map