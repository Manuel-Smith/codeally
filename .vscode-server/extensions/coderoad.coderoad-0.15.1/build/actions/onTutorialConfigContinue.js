"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const tutorialConfig_1 = require("./utils/tutorialConfig");
const commands_1 = require("../commands");
const logger_1 = require("../services/logger");
const webhooks_1 = require("../services/hooks/webhooks");
const onTutorialConfigContinue = async (action, context) => {
    var _a;
    (0, logger_1.default)('onTutorialConfigContinue', action);
    try {
        const tutorialToContinue = context.tutorial.get();
        if (!tutorialToContinue) {
            throw new Error('Invalid tutorial to continue');
        }
        vscode.commands.executeCommand(commands_1.COMMANDS.SET_CURRENT_POSITION, action.payload.position);
        await (0, tutorialConfig_1.default)({
            data: tutorialToContinue,
            alreadyConfigured: true,
        });
        if ((_a = tutorialToContinue.config) === null || _a === void 0 ? void 0 : _a.webhook) {
            (0, webhooks_1.setupWebhook)(tutorialToContinue.config.webhook);
        }
    }
    catch (e) {
        const error = {
            type: 'UnknownError',
            message: `Location: Editor tutorial continue config.\n\n ${e.message}`,
        };
        (0, commands_1.send)({ type: 'CONTINUE_FAILED', payload: { error } });
    }
};
exports.default = onTutorialConfigContinue;
//# sourceMappingURL=onTutorialConfigContinue.js.map