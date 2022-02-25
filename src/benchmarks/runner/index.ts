import { reportMetric } from '../../reporters/cloudwatchReport'
import { reportMetric as reportMetricFile } from '../../reporters/fileReporter'
import { Metric } from '@benchmarks/types/metric'
import { ProviderMetadata } from '@benchmarks/types/provider'

export const runTestAndReport = async (
  providerMetadata: ProviderMetadata,
  iterations: number,
  testName: string,
  task: () => Promise<any>,
) => {
  for (var i = 0; i < iterations; i++) {
    const time = await timeTask(task)
    logDataPoint(
      providerMetadata.name,
      providerMetadata.type,
      testName,
      time,
      i,
    )
  }
}

const logDataPoint = (
  providerName: string,
  providerType: string,
  testName: string,
  time: number,
  iteration: number,
) => {
  const metric: Metric = {
    providerName: providerName,
    providerType: providerType,
    testName: testName,
    time: time,
    timestamp: Date.now(),
    iteration: iteration,
  }

  reportMetric(metric)
  reportMetricFile(metric)
}

export const timeTask = async (task: () => Promise<any>) => {
  const start = Date.now()
  try {
    await task()
  } catch (e) {
    console.error('Something failed.', e.message)
  }
  const end = Date.now()
  return end - start
}
