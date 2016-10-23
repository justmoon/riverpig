export interface CallSite {
  getThis(): any,
  getTypeName(): string,
  getFunction(): Function | undefined,
  getFunctionName(): string | null,
  getMethodName(): string | null,
  getFileName(): string,
  getLineNumber(): string,
  getColumnNumber(): string,
  getEvalOrigin(): string,
  isToplevel(): boolean,
  isEval(): boolean,
  isNative(): boolean,
  isConstructor(): boolean
}
