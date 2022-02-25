# Quick script to run benchmarking on various RPC calls on all the providers

To run the test suite: 
```
npm install
npm run start
```

## Customizing for your own test suite
If you want to test different providers see: `src/providers/index.ts`

If you want to run different queries/tests, make changes to: `src/benchmarks/index.ts`
For example: 
```
runTestAndReport(
    providerMetadata,
    DEFAULT_ITERATIONS,
    '<insert your custom test name>',
    () => <<<insert a promise here to benchmark>>>,
),
```
To get the results to show up in the AWS dashboard for the new test, you need to add the test name to the widgets array in `src/dashboard.ts`

## Dashboards
The framework by default reports all metrics to file in "report.txt" and also attempts to write the metrics to AWS cloudwatch (they give nice graphing tools to us for free). 
To view all of the metrics in 1 place on AWS, there is the CloudWatch Dashboard feature. There is a script in this package to generate the configuration file for the dashboard. Just make sure `src/dashboard.ts` is up to date with your tests then run 
```
npm run generate-dashboard
```
which will output a JSON blob that you can copy/paste into the dashboard UI on AWS console.

AWS Cloudwatch -> Dashboards -> Create Dashboard -> Actions -> View/edit source -> Paste the generated JSON 


