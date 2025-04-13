import { getStoryContext, TestRunnerConfig } from '@storybook/test-runner';

const config: TestRunnerConfig = {
  async preVisit(page, context) {
    // Add pre-render tasks here
  },
  async postVisit(page, context) {
    const storyContext = await getStoryContext(page, context)

    // Log story name and ID after test
    console.log(`Tested: ${storyContext.id}`)
  }
};

module.exports = config;