import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import swaggerTags from 'constants/swagger-tags';
import { JwtAuthGuard } from 'src/auth/jwt';
import { CurrentUser } from 'src/lib/decorators';
import { ResponseInterceptor } from 'src/lib/interceptors';
import { User } from 'src/user/entities';
import { AssetService } from './asset.service';

@Controller('asset')
@ApiTags(swaggerTags.assetTag.name)
@UseGuards(JwtAuthGuard)
@UseInterceptors(ResponseInterceptor)
export class AssetController {
  constructor(private readonly asset: AssetService) {}

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          required: ['true'],
        },
        eventId: { type: 'string' },
      },
    },
  })
  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: 1000000 * 10 } }), //limit of 10mb it takes in bytes
  )
  async upload(
    @CurrentUser() user: User,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { eventId: string },
  ) {
    return this.asset.uploadFile(file, user, body.eventId);
  }
}
