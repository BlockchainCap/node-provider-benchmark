import { Provider } from "@ethersproject/abstract-provider"

export interface ProviderMetadata { 
    name: string
    type: string
    provider: Provider
}