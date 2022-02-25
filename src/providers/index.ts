import { ProviderMetadata } from '@benchmarks/types/provider'
import {
  AlchemyProvider,
  InfuraProvider,
  JsonRpcProvider,
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
    provider: new InfuraProvider('mainnet', process.env.INFURA_API),
  },
  {
    name: 'QuickNode',
    type: 'Pro',
    provider: new JsonRpcProvider(process.env.QUICKNODE_URL),
  },
]
