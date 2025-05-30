// amplify/config.js
import { Amplify } from 'aws-amplify';
import * as AmplifyAPI from '@aws-amplify/api';

const amplifyConfig = {
  aws_project_region: 'eu-west-2',
  aws_cloud_logic_custom: [
    {
      name: 'ScheduleDeviceAPI',
      endpoint: 'https://84xlf53soa.execute-api.eu-west-2.amazonaws.com/dev',
      region: 'eu-west-2',
    },
  ],
};
Amplify.configure(amplifyConfig);
console.log('AmplifyAPI from config:' , AmplifyAPI);
export const API = AmplifyAPI.API;
export default amplifyConfig;