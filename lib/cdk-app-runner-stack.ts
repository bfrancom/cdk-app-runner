import * as apprunner from '@aws-cdk/aws-apprunner-alpha';

import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkAppRunnerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const service = new apprunner.Service(this, 'Service', {
      source: apprunner.Source.fromEcrPublic({
        imageConfiguration: { port: 8000 },
        imageIdentifier: 'public.ecr.aws/aws-containers/hello-app-runner:latest',
      }),
    });
    new cdk.CfnOutput(this, 'apprunner-url', {
      value: service.serviceUrl,
      description: 'App Runner URL',
      exportName: 'apprunner-url',
    });
    // example resource
    // const queue = new sqs.Queue(this, 'CdkAppRunnerQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
