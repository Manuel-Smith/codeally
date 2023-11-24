"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependencies_1 = require("../services/dependencies");
const workspace_1 = require("../services/workspace");
const commands_1 = require("../commands");
const git_1 = require("../services/git");
const onValidateSetup = async () => {
    try {
        const isEmptyWorkspace = await (0, workspace_1.checkWorkspaceEmpty)();
        if (!isEmptyWorkspace) {
            const error = {
                type: 'WorkspaceNotEmpty',
                message: '',
                actions: [
                    {
                        label: 'Open Workspace',
                        transition: 'REQUEST_WORKSPACE',
                    },
                    {
                        label: 'Check Again',
                        transition: 'RETRY',
                    },
                ],
            };
            (0, commands_1.send)({ type: 'VALIDATE_SETUP_FAILED', payload: { error } });
            return;
        }
        const { version, error: gitError } = await (0, dependencies_1.getVersion)('git');
        if (gitError) {
            const error = {
                type: 'GitConfigError',
                message: gitError.message,
                actions: [
                    {
                        label: 'Check Again',
                        transition: 'TRY_AGAIN',
                    },
                ],
            };
            (0, commands_1.send)({ type: 'VALIDATE_SETUP_FAILED', payload: { error } });
            return;
        }
        if (!version) {
            const error = {
                type: 'GitNotFound',
                message: '',
                actions: [
                    {
                        label: 'Check Again',
                        transition: 'RETRY',
                    },
                ],
            };
            (0, commands_1.send)({ type: 'VALIDATE_SETUP_FAILED', payload: { error } });
            return;
        }
        const isGitUserNameConfigured = await (0, git_1.validateGitConfig)('user.name');
        const isGitUserEmailConfigured = await (0, git_1.validateGitConfig)('user.email');
        if (!isGitUserNameConfigured || !isGitUserEmailConfigured) {
            let message = '';
            if (!isGitUserNameConfigured)
                message += 'Git user not configured.\n';
            if (!isGitUserEmailConfigured)
                message += 'Git email not configured.';
            const error = {
                type: 'GitUserNotConfigured',
                message,
                actions: [
                    {
                        label: 'Check Again',
                        transition: 'RETRY',
                    },
                ],
            };
            (0, commands_1.send)({ type: 'VALIDATE_SETUP_FAILED', payload: { error } });
            return;
        }
        (0, commands_1.send)({ type: 'SETUP_VALIDATED' });
    }
    catch (e) {
        const error = {
            type: 'UnknownError',
            message: e.message,
        };
        (0, commands_1.send)({ type: 'VALIDATE_SETUP_FAILED', payload: { error } });
    }
};
exports.default = onValidateSetup;
//# sourceMappingURL=onValidateSetup.js.map