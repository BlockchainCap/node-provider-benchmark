import { reportMetric } from '../../reporters/cloudwatchReport'
import { reportMetric as reportMetricFile } from '../../reporters/fileReporter'
import { Metric } from '@benchmarks/types/metric'
import { ProviderMetadata } from '@benchmarks/types/provider'
import { setTimeout } from 'timers'

export const runTestAndReport = async (
  providerMetadata: ProviderMetadata,
  iterations: number,
  testName: string,
  delay: number,
  task: () => Promise<any>,
) => {
  if (iterations < 0) {
    var i = 0
    while (true) {
      const time = await timeTask(task)
      logDataPoint(
        providerMetadata.name,
        providerMetadata.type,
        testName,
        time,
        i,
      )
      i++
      await wait(delay)
    }
  }
  for (var i = 0; i < iterations; i++) {
    const time = await timeTask(task)
    logDataPoint(
      providerMetadata.name,
      providerMetadata.type,
      testName,
      time,
      i,
    )
    await wait(delay)
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

export const wait = (delay: number) => new Promise((res) => setTimeout(res, delay))