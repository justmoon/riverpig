export type LogMethod = (message: string, ...optionalParams: any[]) => void

export interface Logger {
  debug: LogMethod,
  info: LogMethod,
  warn: LogMethod
  error: LogMethod,
  trace(): void,
  assert(value: any, message?: string, ...optionalParams: any[]): void
  dir(obj: any, options?: {showHidden?: boolean, depth?: number, colors?: boolean}): void
  time(label: string): void
  timeEnd(label: string): void
}
