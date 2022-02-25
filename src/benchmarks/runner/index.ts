import { ProviderMetadata } from '@benchmarks/types/provider'

export const runTestAndReport = async (
  providerMetadata: ProviderMetadata,
  iterations: number,
  testName: string,
  task: () => Promise<any>,
) => {
  for (var i = 0; i < iterations; i++) {
    const time = await timeTask(task)
    logDataPoint(providerMetadata.name, providerMetadata.type, testName, time)
  }
}

const logDataPoint = (
  providerName: string,
  providerType: string,
  testName: string,
  time: number,
) => {
  console.log({
    providerName: providerName,
    providerType: providerType,
    testName: testName,
    time: time,
  })
}

export const timeTask = async (task: () => Promise<any>) => {
  const start = Date.now()
  try {
    await task()
  } catch (e) {
    console.error('Something failed.')
  }
  const end = Date.now()
  return end - start
}
