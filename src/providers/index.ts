import { ProviderMetadata } from '@benchmarks/types/provider'
import {
  AlchemyProvider,
  StaticJsonRpcProvider,
} from '@ethersproject/providers'

export const providers: ProviderMetadata[] = [
  {
    name: 'Alchemy',
    type: 'Growth',
    provider: new AlchemyProvider('mainnet', process.env.ALCHEMY_API_KEY),
  },
  {
    name: 'Infura',
    type: 'Standard',
    provider: new StaticJsonRpcProvider(process.env.INFURA_URL),
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
  {
    name: 'Moralis',
    type: 'SpeedyNode',
    provider: new StaticJsonRpcProvider(process.env.MORALIS_URL),
  },
  {
    name: 'Moralis',
    type: 'SpeedyNode-Archival',
    provider: new StaticJsonRpcProvider(process.env.MORALIS_ARCH_URL),
  },
]
