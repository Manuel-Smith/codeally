"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onTutorialComplete = exports.onLevelComplete = exports.onStepComplete = exports.onReset = exports.onInit = exports.setupWebhook = void 0;
const node_fetch_1 = require("node-fetch");
const logger_1 = require("../logger");
const environment_1 = require("../../environment");
const WEBHOOK_EVENTS = {
    init: false,
    reset: false,
    step_complete: false,
    level_complete: false,
    tutorial_complete: false,
};
let WEBHOOK_URI;
const setupWebhook = (webhookConfig) => {
    if (!webhookConfig.url) {
        return;
    }
    WEBHOOK_URI = webhookConfig.url;
    const events = webhookConfig.events;
    for (const eventName of Object.keys(events || {})) {
        WEBHOOK_EVENTS[eventName] = events[eventName];
    }
};
exports.setupWebhook = setupWebhook;
const callWebhookEndpoint = async (bodyObject) => {
    if (!WEBHOOK_URI) {
        return;
    }
    const headers = { 'Content-Type': 'application/json' };
    if (environment_1.WEBHOOK_TOKEN) {
        headers['CodeRoad-User-Token'] = environment_1.WEBHOOK_TOKEN;
    }
    const body = JSON.stringify(bodyObject);
    try {
        const sendEvent = await (0, node_fetch_1.default)(WEBHOOK_URI, {
            method: 'POST',
            headers,
            body,
        });
        if (!sendEvent.ok) {
            throw new Error('Error sending event');
        }
    }
    catch (err) {
        (0, logger_1.default)(`Failed to call webhook endpoint ${WEBHOOK_URI} with body ${body}`);
    }
};
const onInit = (event) => {
    if (WEBHOOK_EVENTS.init) {
        callWebhookEndpoint(event);
    }
};
exports.onInit = onInit;
const onReset = (event) => {
    if (WEBHOOK_EVENTS.reset) {
        callWebhookEndpoint(event);
    }
};
exports.onReset = onReset;
const onStepComplete = (event) => {
    if (WEBHOOK_EVENTS.step_complete) {
        callWebhookEndpoint(event);
    }
};
exports.onStepComplete = onStepComplete;
const onLevelComplete = (event) => {
    if (WEBHOOK_EVENTS.level_complete) {
        callWebhookEndpoint(event);
    }
};
exports.onLevelComplete = onLevelComplete;
const onTutorialComplete = (event) => {
    if (WEBHOOK_EVENTS.tutorial_complete) {
        callWebhookEndpoint(event);
    }
};
exports.onTutorialComplete = onTutorialComplete;
//# sourceMappingURL=webhooks.js.map