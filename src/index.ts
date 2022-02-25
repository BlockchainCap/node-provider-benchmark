import dotenv from 'dotenv'
dotenv.config()
import { runBenchmarks } from './benchmarks'
;(async () => {
  await runBenchmarks()
})()
