"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const commands_1 = require("./commands");
const telemetry = require("./services/telemetry");
let onDeactivate = () => {
};
const activate = (vscodeExt) => {
    vscode.commands.executeCommand('vscode.setEditorLayout', {
        orientation: 0,
        groups: [{ size: 0.6 }, { size: 0.4 }],
    });
    const commands = (0, commands_1.createCommands)({
        extensionPath: vscodeExt.extensionPath,
        workspaceState: vscodeExt.workspaceState,
    });
    const subscribe = (sub) => {
        vscodeExt.subscriptions.push(sub);
    };
    for (const cmd in commands) {
        const command = vscode.commands.registerCommand(cmd, commands[cmd]);
        subscribe(command);
    }
    telemetry.activate(subscribe);
    onDeactivate = () => {
        for (const disposable of vscodeExt.subscriptions) {
            disposable.dispose();
        }
        telemetry.deactivate();
    };
};
exports.activate = activate;
const deactivate = () => onDeactivate();
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map