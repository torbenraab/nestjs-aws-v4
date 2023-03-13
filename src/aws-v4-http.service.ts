import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Optional } from '@nestjs/common';
import { aws4Interceptor } from 'aws4-axios/dist/interceptor';
import { AxiosInstance } from 'axios';

import { AwsV4HttpModuleOptions } from './aws-v4-http.module';
import { AWS_V4_HTTP_MODULE_OPTIONS, AXIOS_INSTANCE_TOKEN } from './constants';

@Injectable()
export class AwsV4HttpService extends HttpService {
  constructor(
    @Inject(AXIOS_INSTANCE_TOKEN) axiosInstance: AxiosInstance,
    @Optional()
    @Inject(AWS_V4_HTTP_MODULE_OPTIONS)
    config: AwsV4HttpModuleOptions,
  ) {
    super(axiosInstance);
    axiosInstance.interceptors.request.use(
      aws4Interceptor(config, config?.credentials),
    );
  }
}
