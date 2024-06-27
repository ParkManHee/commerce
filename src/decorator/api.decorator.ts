import { SetMetadata, Type, UseGuards, applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiOperationOptions,
  ApiParamOptions,
  ApiBodyOptions,
  ApiQueryOptions,
  ApiBody,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { ApiResDataRespones } from './res-data.decorator';

interface IApiDeco {
  operation: ApiOperationOptions;
  params?: ApiParamOptions[];
  body?: ApiBodyOptions;
  query?: ApiQueryOptions;
  responses?: {
    type: Type<unknown>;
    description?: string;
    status?: number;
    isArray?: boolean;
  };
}

export function ApiDeco(option: IApiDeco) {
  const decorators = [ApiOperation(option.operation)];
  if (option.params) {
    decorators.push(...option.params.map((param) => ApiParam(param)));
  }
  if (option.body) {
    decorators.push(ApiBody(option.body));
  }
  if (option.query) {
    decorators.push(ApiQuery(option.query));
  }

  if (option.responses) {
    const { type, description, status, isArray } = option.responses;
    let args:
      | { description?: string | undefined; status?: number | undefined }
      | undefined;
    if (description || status) args = { description, status };

    const { ext, res } = ApiResDataRespones(type, args, isArray);
    
    decorators.push(ext, res!);
  }

  return applyDecorators(...decorators);
}
