import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { HttpModule } from './infra/http/http.module';
import { AuthModule } from './middlewares/auth/auth.module';

@Module({
  imports: [DatabaseModule, HttpModule, AuthModule],
})
export class AppModule {}
