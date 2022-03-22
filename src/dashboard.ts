import { providers } from './providers'
import { ProviderMetadata } from './types/provider'

const getFaultsWidget = (metricName: string) => {
  return {
    type: 'metric',
    x: 0,
    y: 0,
    width: 24,
    height: 7,
    properties: {
      metrics: getMetrics(metricName, 'FAULT'),
      view: 'timeSeries',
      stacked: false,
      region: 'us-west-2',
      start: '-PT1H',
      end: 'P0D',
      stat: 'Sum',
      period: 1,
      title: metricName + " Faults",
    },
  }
}
const getTimeWidget = (metricName: string) => {
  return {
    type: 'metric',
    x: 0,
    y: 0,
    width: 24,
    height: 7,
    properties: {
      metrics: getMetrics(metricName, 'BENCHMARK_TIME'),
      view: 'timeSeries',
      stacked: false,
      region: 'us-west-2',
      start: '-PT1H',
      end: 'P0D',
      stat: 'p99',
      period: 1,
      title: metricName + " Timed",
      yAxis: {
        left: {
          max: metricName.toLowerCase().includes('log') ? 10_000 : 1500,
        },
      },
    },
  }
}

const getMetrics = (metricName: string, metricType: string) =>
  providers.map((pm: ProviderMetadata, i: number) => {
    return [
      'NodeProviders',
      metricType,
      'providerName',
      pm.name,
      'providerType',
      pm.type,
      'testName',
      metricName,
      { id: 'm' + (i + 1) },
    ]
  })


const widgets = [
  'getBlock',
  'getOldBlock',
  'getBlockNumber',
  'getBalance',
  'getBalanceERC20(eth_call)',
  'getLogs_erc20(100-blocks)',
  'getLogs_erc20(2k-blocks)',
  'getLogs_erc20(10k-blocks)',
]
const timeWidgets = widgets.map(getTimeWidget)
const faultWidgets = widgets.map(getFaultsWidget)

console.log(
  JSON.stringify({
    widgets: [...timeWidgets, ...faultWidgets],
  }),
)
