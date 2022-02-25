import { Metric } from '@benchmarks/types/metric'
import * as fs from 'fs'

export const reportMetric = async (metric: Metric) => {
  if (!fs.existsSync('out/report.txt')) {
    fs.mkdirSync('out')
    fs.writeFileSync('out/report.txt', '')
  }
  fs.appendFileSync('out/report.txt', JSON.stringify(metric))
}
