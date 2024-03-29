import { Controller } from '@nestjs/common'
import { AppService } from './app.service'
import { IpcInvoke } from './transport'

@Controller()
export class AppController {
  constructor(private appService: AppService) {
    this.appService.initApp()
  }

  @IpcInvoke('ipc/getLocalAddress')
  public async handleGetLocalAddress() {}
}
