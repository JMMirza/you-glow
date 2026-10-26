import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OpenAiService } from '../services';
import { StoreOpenAiDto } from '../dto';
import { DecryptTokenInterceptor } from 'src/interceptors';

@ApiTags('OpenAI')
@ApiBearerAuth()
@Controller()
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}

  @UseInterceptors(DecryptTokenInterceptor)
  @Post()
  @ApiOperation({ summary: 'Store OpenAI Response by Prompt Type' })
  @ApiBody({ type: StoreOpenAiDto })
  async storeOpenAiResponse(
    @Request() request: any,
    @Body() dto: StoreOpenAiDto,
  ) {
    const userId = request.user.id;
    return this.openAiService.storeOpenAiResponse(userId, dto);
  }

  @UseInterceptors(DecryptTokenInterceptor)
  @Get(':promptType')
  @ApiOperation({ summary: 'Get OpenAI Response by Prompt Type' })
  async getOpenAiResponse(
    @Request() request: any,
    @Param() dto: StoreOpenAiDto,
  ) {
    const userId = request.user.id;
    return this.openAiService.getOpenAiResponse(userId, dto);
  }
}
