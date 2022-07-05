import { getCurrentInstance, onUnmounted, toRaw } from 'vue'
const { ipcRenderer } = window

export function useIpcListener(event: string, callback: (...args: any[]) => any) {
  ipcRenderer.on(event, (e, ...args) => callback(...args))
  if (getCurrentInstance()) {
    onUnmounted(() => ipcRenderer.removeAllListeners(event))
  }
}
