import { reportFault, reportMetric } from '../../reporters/cloudwatchReport'
import { reportMetric as reportMetricFile } from '../../reporters/fileReporter'
import { Metric } from '@benchmarks/types/metric'
import { ProviderMetadata } from '@benchmarks/types/provider'
import { setTimeout } from 'timers'

export const runTestAndReport = async (
  providerMetadata: ProviderMetadata,
  iterations: number,
  testName: string,
  blocking: boolean,
  delay: number,
  task: () => Promise<any>,
) => {
  var i = 0
  while (iterations < 0 || i < iterations) {
    // should wait or continue blasting?
    if (blocking) {
      await runTask(providerMetadata, testName, i, task)
    } else {
      runTask(providerMetadata, testName, i, task)
    }
    console.log('Task complete: ', providerMetadata.name, testName, i)
    i++
    await wait(delay)
  }
}
const runTask = async (
  providerMetadata: ProviderMetadata,
  testName: string,
  i: number,
  task: () => Promise<any>,
) => {
  var time
  try {
    time = await timeTask(task)
    logDataPoint(
      providerMetadata.name,
      providerMetadata.type,
      testName,
      time,
      i,
    )
  } catch (e) {
    console.error('Failed to run task.', providerMetadata.name, providerMetadata.type, i)
    reportFailure(providerMetadata.name, providerMetadata.type, testName, i)
  }
}
const reportFailure = (
  providerName: string,
  providerType: string,
  testName: string,
  iteration: number,
) => {
  const metric: Metric = {
    providerName: providerName,
    providerType: providerType,
    testName: testName,
    timestamp: Date.now(),
    iteration: iteration,
  }
  reportFault(metric)
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
  await task()
  const end = Date.now()
  return end - start
}

export const wait = (delay: number) =>
  new Promise((res) => setTimeout(res, delay))
