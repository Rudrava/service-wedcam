import { Module } from '@nestjs/common';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';
import { FirebaseClientProvider } from 'src/features/clients';
import { FirebaseService } from 'src/features/services';

@Module({
  controllers: [AssetController],
  providers: [FirebaseClientProvider, FirebaseService, AssetService],
})
export class AssetModule {}
