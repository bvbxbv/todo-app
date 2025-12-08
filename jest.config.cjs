const { createDefaultPreset } = require("ts-jest");
const preset = createDefaultPreset({ esm: true });

module.exports = {
	...preset,
	testEnvironment: "node",
	extensionsToTreatAsEsm: [".ts"],
	transform: {
		"^.+\\.tsx?$": ["ts-jest", { useESM: true }],
	},
};
