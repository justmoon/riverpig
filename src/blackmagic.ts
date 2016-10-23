declare global {
  interface ErrorConstructor {
    prepareStackTrace: any
  }
}

import { CallSite } from './interfaces/call-site'

export function getCallsite (belowFunction: Function): CallSite {
  const oldLimit = Error.stackTraceLimit
  Error.stackTraceLimit = 1

  const v8Handler = Error.prepareStackTrace
  Error.prepareStackTrace = (dummy: any, stack: any) => stack

  const dummy = { stack: [] }
  Error.captureStackTrace(dummy, belowFunction || getCallsite)
  const callsite = dummy.stack[dummy.stack.length - 1]

  Error.prepareStackTrace = v8Handler
  Error.stackTraceLimit = oldLimit

  return callsite
}
