import { toRaw } from 'vue'

const { ipcRenderer } = window

export const ipcInvoke = async (target: string, ...args: any[]) => {
  const payloads: any[] = args.map(e => toRaw(e))
  const response = await ipcRenderer.invoke(target, ...payloads)
  /* eslint-disable-next-line no-useless-call */
  if (response.hasOwnProperty.call(response, 'error')) {
    throw response.error
  }
  return response
}
