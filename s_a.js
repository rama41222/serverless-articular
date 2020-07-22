
var serverlessSDK = require('./serverless_sdk/index.js');
serverlessSDK = new serverlessSDK({
  orgId: 'dinushankanrg',
  applicationName: 'serverless-articular',
  appUid: 'ykvW16Yb7HL6KCZRj8',
  orgUid: 'T3L8yTwYDgVMlJycdz',
  deploymentUid: '273c8f84-c5ec-4bde-9b34-1dda4c654554',
  serviceName: 'serverless-articular',
  shouldLogMeta: true,
  shouldCompressLogs: true,
  disableAwsSpans: false,
  disableHttpSpans: false,
  stageName: 'production',
  serverlessPlatformStage: 'prod',
  devModeEnabled: false,
  accessKey: null,
  pluginVersion: '3.6.16',
  disableFrameworksInstrumentation: false
});

const handlerWrapperArgs = { functionName: 'serverless-articular-production-a', timeout: 6 };

try {
  const userHandler = require('./src/topics/topics.js');
  module.exports.handler = serverlessSDK.handler(userHandler.handler, handlerWrapperArgs);
} catch (error) {
  module.exports.handler = serverlessSDK.handler(() => { throw error }, handlerWrapperArgs);
}