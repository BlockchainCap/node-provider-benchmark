const getWidget = (metricName: String) => {
  return {
    type: 'metric',
    x: 0,
    y: 0,
    width: 6,
    height: 6,
    properties: {
      metrics: [
        [
          'NodeProviders',
          'BENCHMARK_TIME',
          'providerName',
          'Alchemy',
          'providerType',
          'Growth',
          'testName',
          metricName,
          { id: 'm1' },
        ],
        ['...', 'Infura', '.', 'Standard', '.', '.', { id: 'm2' }],
        ['...', 'QuickNode', '.', 'Pro', '.', '.', { id: 'm3' }],
      ],
      view: 'timeSeries',
      stacked: false,
      region: 'us-west-2',
      start: '-PT1H',
      end: 'P0D',
      stat: 'p99',
      period: 1,
      title: metricName,
    },
  }
}

const widgets = [
  'getBlock',
  'getBlockNumber',
  'getBalance',
  'getBalanceERC20(eth_call)',
  'getLogs_erc20',
].map(getWidget)

console.log(
  JSON.stringify({
    widgets: widgets,
  }),
)
