"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareVersions = exports.getVersion = void 0;
const semver_1 = require("semver");
const node_1 = require("../node");
const semverRegex = /(?<=^v?|\sv?)(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-(?:0|[1-9]\d*|[\da-z-]*[a-z-][\da-z-]*)(?:\.(?:0|[1-9]\d*|[\da-z-]*[a-z-][\da-z-]*))*)?(?:\+[\da-z-]+(?:\.[\da-z-]+)*)?(\.windows.[0-9]+)?(?=$|\s)/gi;
const getVersion = async (name) => {
    try {
        const { stdout, stderr } = await (0, node_1.exec)({ command: `${name} --version` });
        if (!stderr) {
            const match = stdout.match(semverRegex);
            if (match) {
                const parsedVersion = match[0].split('.').slice(0, 3).join('.');
                return { version: parsedVersion, error: null };
            }
        }
        return { version: null, error: null };
    }
    catch (error) {
        return { version: null, error };
    }
};
exports.getVersion = getVersion;
const compareVersions = async (currentVersion, expectedVersion) => {
    return (0, semver_1.satisfies)(currentVersion, expectedVersion);
};
exports.compareVersions = compareVersions;
//# sourceMappingURL=index.js.map