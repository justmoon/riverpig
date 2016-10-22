import { CompleteLoggerConfig, LineinfoSetting } from './interfaces/logger-config'

const lineInfoMap = {
  '1': LineinfoSetting.Smart,
  'true': LineinfoSetting.Smart,
  'smart': LineinfoSetting.Smart,
  'long': LineinfoSetting.Long,
  'fileonly': LineinfoSetting.FileOnly,
  'short': LineinfoSetting.Short
}

export const getEnvConfig = () : CompleteLoggerConfig => {
  const lineInfo = lineInfoMap[process.env.RIVERPIG_LINEINFO] || LineinfoSetting.None
  return {
    lineInfo,
    parentLogger: console
  }
}
