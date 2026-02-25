module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
  // Ignore compiled test files in dist/ so Jest only runs source tests
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
