import { providers } from './providers'
import { ProviderMetadata } from './types/provider'

const getWidget = (metricName: string) => {
  return {
    type: 'metric',
    x: 0,
    y: 0,
    width: 24,
    height: 7,
    properties: {
      metrics: getMetrics(metricName),
      view: 'timeSeries',
      stacked: false,
      region: 'us-west-2',
      start: '-PT1H',
      end: 'P0D',
      stat: 'p99',
      period: 1,
      title: metricName,
      yAxis: {
        left: {
          max: metricName.toLowerCase().includes('log') ? 4500 : 1500,
        },
      },
    },
  }
}

const getMetrics = (metricName: string) =>
  providers.map((pm: ProviderMetadata, i: number) => {
    return [
      'NodeProviders',
      'BENCHMARK_TIME',
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
].map(getWidget)

console.log(
  JSON.stringify({
    widgets: widgets,
  }),
)
