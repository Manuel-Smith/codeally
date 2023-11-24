"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearOutput = exports.showOutput = exports.addOutput = void 0;
const vscode = require("vscode");
const channels = {};
const getOutputChannel = (name) => {
    if (!channels[name]) {
        channels[name] = vscode.window.createOutputChannel(name);
    }
    return channels[name];
};
const addOutput = (params) => {
    const channel = getOutputChannel(params.channel);
    channel.clear();
    channel.append(params.text);
};
exports.addOutput = addOutput;
const showOutput = (channelName) => {
    const channel = getOutputChannel(channelName);
    channel.show();
};
exports.showOutput = showOutput;
const clearOutput = (channelName) => {
    const channel = getOutputChannel(channelName);
    channel.clear();
    channel.hide();
};
exports.clearOutput = clearOutput;
//# sourceMappingURL=output.js.map