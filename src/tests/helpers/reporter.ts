import { DisplayProcessor, SpecReporter, StacktraceOption } from 'jasmine-spec-reporter'
import SuiteInfo = jasmine.SuiteInfo

class CustomProcessor extends DisplayProcessor {
  public displayJasmineStarted(info: SuiteInfo, log: string): string {
    return `TypeScript ${log}`
  }
}

const reporter = new SpecReporter({
    suite: {
      displayNumber: true
    },
    spec: {
      displayStacktrace: StacktraceOption.NONE,
      displayDuration: true
    },
    summary: {
      displayErrorMessages: true
    },
    prefixes: {
      successful: '✅ - '
    },
    customProcessors: [CustomProcessor]
  })

jasmine.getEnv().clearReporters()
jasmine.getEnv().addReporter(reporter)