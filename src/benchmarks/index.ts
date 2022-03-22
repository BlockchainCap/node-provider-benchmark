import { providers } from '../providers'
import { ProviderMetadata } from '../types/provider'
import { runTestAndReport } from './runner'
import { abi as ERC20 } from '@openzeppelin/contracts/build/contracts/ERC20.json'
import { Contract } from 'ethers'
import { Filter } from '@ethersproject/providers'

const UNLIMITTED_ITERATIONS = -1
const DEFAULT_DELAY_BETWEEN_CALLS = 50

export const runBenchmarks = async () => {
  await Promise.all(
    providers.map(async (providerMetadata: ProviderMetadata) => {
      const erc20: Contract = new Contract(
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        ERC20,
        providerMetadata.provider,
      )
      const filter: Filter = erc20.filters.Transfer(null, null, null)
      const filter2k: Filter = erc20.filters.Transfer(null, null, null)
      const filter10k: Filter = erc20.filters.Transfer(null, null, null)
      filter.fromBlock = 14_000_000
      filter.toBlock = 14_000_100
      filter2k.fromBlock = 7_000_000
      filter2k.toBlock = 7_002_000
      filter10k.fromBlock = 12_000_000
      filter10k.toBlock = 12_010_000
      await Promise.all([
        runTestAndReport(
          providerMetadata,
          UNLIMITTED_ITERATIONS,
          'getBlockNumber',
          false,
          DEFAULT_DELAY_BETWEEN_CALLS,
          () => providerMetadata.provider.getBlockNumber(),
        ),
        runTestAndReport(
          providerMetadata,
          UNLIMITTED_ITERATIONS,
          'getBlock',
          false,
          DEFAULT_DELAY_BETWEEN_CALLS,
          () => providerMetadata.provider.getBlock(14_000_000),
        ),
        runTestAndReport(
          providerMetadata,
          UNLIMITTED_ITERATIONS, 
          'getOldBlock',
          false,
          DEFAULT_DELAY_BETWEEN_CALLS,
          () => providerMetadata.provider.getBlock(5_000_000),
        ),
        runTestAndReport(
          providerMetadata,
          UNLIMITTED_ITERATIONS, 
          'getBalance',
          false,
          DEFAULT_DELAY_BETWEEN_CALLS,
          () =>
            providerMetadata.provider.getBalance(
              '0x5337122c6b5ce24D970Ce771510D22Aeaf038C44',
            ),
        ),
        runTestAndReport(
          providerMetadata,
          UNLIMITTED_ITERATIONS, 
          'getBalanceERC20(eth_call)',
          false,
          DEFAULT_DELAY_BETWEEN_CALLS,
          () => erc20.balanceOf('0x5337122c6b5ce24D970Ce771510D22Aeaf038C44'),
        ),
        runTestAndReport(
          providerMetadata,
          UNLIMITTED_ITERATIONS,
          'getLogs_erc20(100-blocks)',
          true,
          DEFAULT_DELAY_BETWEEN_CALLS,
          () => providerMetadata.provider.getLogs(filter),
        ),
        runTestAndReport(
          providerMetadata,
          UNLIMITTED_ITERATIONS,
          'getLogs_erc20(2k-blocks)',
          true,
          DEFAULT_DELAY_BETWEEN_CALLS,
          () => providerMetadata.provider.getLogs(filter2k),
        ),
        runTestAndReport(
          providerMetadata,
          UNLIMITTED_ITERATIONS,
          'getLogs_erc20(10k-blocks)',
          true,
          DEFAULT_DELAY_BETWEEN_CALLS,
          () => providerMetadata.provider.getLogs(filter10k),
        ),
      ])
    }),
  )
}
