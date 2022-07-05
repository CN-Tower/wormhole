import { UseFilters, applyDecorators } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { ipcMain } from 'electron'
import { ipcMessageDispatcher } from './dispatcher'
import { AllExceptionsFilter } from './filter'

function GetParamsFromMessageChannel() {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value
    descriptor.value = function (args: any[]) {
      return method.apply(this, args)
    }
    return descriptor
  }
}

export function IpcInvoke(messageChannel: string) {
  ipcMain.handle(messageChannel, (...args) => ipcMessageDispatcher.emit(messageChannel, ...args))
  return applyDecorators(
    GetParamsFromMessageChannel(),
    MessagePattern(messageChannel),
    UseFilters(new AllExceptionsFilter()),
  )
}
