import { applyDecorators } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiQuery, ApiParam, ApiOperation, ApiBadRequestResponse, ApiCreatedResponse, ApiBody, ApiNotFoundResponse } from '@nestjs/swagger';
import { CreateHaulerBillDto } from './dto/create-hualer-bills.dto';



export const HaulerBillsApiTags = ApiTags('Hauler Bills');

export const GetHaulerBillsListSwagger = applyDecorators(
  ApiOperation({ summary: 'Get hauler bills list', description: 'Retrieve a paginated list of hauler bills' }),
  ApiParam({ name: 'account_id', description: 'Account ID' }),
  ApiQuery({ name: 'page', required: false, description: 'Page number (default: 1)' }),
  ApiQuery({ name: 'limit', required: false, description: 'Number of items per page (default: 10, max: 50)' }),
  ApiQuery({ name: 'is_active', required: false, description: 'Filter by active status' }),
  ApiQuery({ name: 'name', required: false, description: 'Filter by customer name' }),
  ApiOkResponse({ description: 'Paginated list of hauler bills' })
);

export const CreateHaulerBillSwagger = applyDecorators(
  ApiOperation({ summary: 'Create a new hauler bill', description: 'Create a new hauler bill with the provided data' }),
  ApiCreatedResponse({ description: 'Hauler bill created successfully' }),
  ApiBadRequestResponse({ description: 'Invalid hauler bill data' }),
  ApiParam({ name: 'account_id', description: 'Account ID' }),
  ApiBody({ type: CreateHaulerBillDto })
);

