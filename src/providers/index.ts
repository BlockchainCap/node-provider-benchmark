import { ProviderMetadata } from '@benchmarks/types/provider'
import {
  AlchemyProvider,
  StaticJsonRpcProvider,
} from '@ethersproject/providers'

export const providers: ProviderMetadata[] = [
  {
    name: 'Alchemy',
    type: 'Growth',
    provider: new AlchemyProvider('mainnet', process.env.ALCHEMY_API),
  },
  {
    name: 'Infura',
    type: 'Standard',
    provider: new StaticJsonRpcProvider(process.env.INFURA_API),
  },
  {
    name: 'QuickNode',
    type: 'Pro',
    provider: new StaticJsonRpcProvider(process.env.QUICKNODE_URL),
  },
  {
    name: 'Pocket',
    type: 'default',
    provider: new StaticJsonRpcProvider(process.env.POCKET_URL),
  },
]
