import { Metric } from '@benchmarks/types/metric'

import * as fs from 'fs'
import * as path from 'path'

export const reportMetric = async (metric: Metric) => {
  fs.appendFileSync(path.join(__dirname, 'report.txt'), JSON.stringify(metric))
}
