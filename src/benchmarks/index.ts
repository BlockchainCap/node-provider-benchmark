import { providers } from '../providers'
import { ProviderMetadata } from '../types/provider'
import { runTestAndReport } from './runner'
import { abi as ERC20 } from '@openzeppelin/contracts/build/contracts/ERC20.json'
import { Contract } from 'ethers'
import { Filter } from '@ethersproject/providers'

const DEFAULT_ITERATIONS = 1000
export const runBenchmarks = async () => {
  await Promise.all(
    providers.map(async (providerMetadata: ProviderMetadata) => {
      const erc20: Contract = new Contract(
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        ERC20,
        providerMetadata.provider,
      )
      const filter: Filter = erc20.filters.Transfer(null, null, null)
      filter.fromBlock = 14_000_000
      filter.toBlock = 14_000_100
      await Promise.all([
        runTestAndReport(
          providerMetadata,
          DEFAULT_ITERATIONS,
          'getBlockNumber',
          () => providerMetadata.provider.getBlockNumber(),
        ),
        runTestAndReport(providerMetadata, DEFAULT_ITERATIONS, 'getBlock', () =>
          providerMetadata.provider.getBlock(14_000_000),
        ),
        runTestAndReport(
          providerMetadata,
          DEFAULT_ITERATIONS,
          'getOldBlock',
          () => providerMetadata.provider.getBlock(5_000_000),
        ),
        runTestAndReport(
          providerMetadata,
          DEFAULT_ITERATIONS,
          'getBalance',
          () =>
            providerMetadata.provider.getBalance(
              '0x5337122c6b5ce24D970Ce771510D22Aeaf038C44',
            ),
        ),
        runTestAndReport(
          providerMetadata,
          DEFAULT_ITERATIONS,
          'getBalanceERC20(eth_call)',
          () => erc20.balanceOf('0x5337122c6b5ce24D970Ce771510D22Aeaf038C44'),
        ),
        runTestAndReport(
          providerMetadata,
          100, // this is way slower obv
          'getLogs_erc20(100-blocks)',
          () => providerMetadata.provider.getLogs(filter),
        ),
      ])
    }),
  )
}
