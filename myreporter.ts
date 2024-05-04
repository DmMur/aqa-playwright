import type {
  Reporter,
  FullConfig,
  Suite,
  TestCase,
  TestResult,
  FullResult,
} from "@playwright/test/reporter";

class MyReporter implements Reporter {
  constructor(options: { customOption?: string } = {}) {
    console.log(`My reporter setup with customOption`);
  }

  onBegin(config: FullConfig, suite: Suite) {
    console.log(`Starting reporting ${suite.allTests().length} tests`);
  }

  onTestBegin(test: TestCase) {
    console.log(`Starting test name - ${test.title}`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    console.log(`Finished test, reporting  ${test.title}: ${result.status}`);
  }

  onEnd(result: FullResult) {
    console.log(`Finished the run: ${result.status}`);
  }
}
export default MyReporter;
