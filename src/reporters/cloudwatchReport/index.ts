import { Metric } from '@benchmarks/types/metric'
import CloudWatch, {
  MetricData,
  PutMetricDataInput,
} from 'aws-sdk/clients/cloudwatch'
import AWS from 'aws-sdk'

AWS.config.update({ region: 'us-west-2' })
const cloudwatch: CloudWatch = new CloudWatch()

const metricsPerRequest = 20

let metricsCache: MetricData = []

export const reportMetric = async (metric: Metric) => {
  const metricParams = [
    { Name: 'providerName', Value: metric.providerName },
    { Name: 'providerType', Value: metric.providerType },
    { Name: 'testName', Value: metric.testName },
  ]

  metricsCache.push({
    MetricName: 'BENCHMARK_TIME',
    Dimensions: metricParams,
    Unit: 'Milliseconds',
    Value: metric.time,
    Timestamp: new Date(metric.timestamp),
    StorageResolution: 1,
  })

  if (metricsCache.length >= metricsPerRequest) {
    const requestParams: PutMetricDataInput = {
      MetricData: metricsCache,
      Namespace: 'NodeProviders',
    }
    metricsCache = []
    await putMetric(requestParams)
  }
}

export const reportFault = async (metric: Metric) => {
  const metricParams = [
    { Name: 'providerName', Value: metric.providerName },
    { Name: 'providerType', Value: metric.providerType },
    { Name: 'testName', Value: metric.testName },
  ]

  metricsCache.push({
    MetricName: 'FAULT',
    Dimensions: metricParams,
    Value: 1,
    Timestamp: new Date(metric.timestamp),
    StorageResolution: 1,
  })

  if (metricsCache.length >= metricsPerRequest) {
    const requestParams: PutMetricDataInput = {
      MetricData: metricsCache,
      Namespace: 'NodeProviders',
    }
    metricsCache = []
    await putMetric(requestParams)
  }
}

const putMetric = async (requestParams: PutMetricDataInput) => {
  try {
    await cloudwatch.putMetricData(requestParams).promise()
  } catch (err) {
    console.error('Failed to put metric data to AWS', err)
  }
}
