import type { MessageOptions, MessageOptionsWithType } from 'element-plus'

type MessageOptionsType = Required<MessageOptions>['type']
type MessageOptionsWithoutTypeAndMessage = Omit<MessageOptions, 'type' | 'message'>

export function createBaseMessage(type: MessageOptionsType) {
  const defaultOptions: MessageOptionsWithoutTypeAndMessage = {
    duration: 2000,
    showClose: true,
  }
  return (message: string, options: MessageOptionsWithType = {}) => {
    return ElMessage({
      type,
      message,
      ...defaultOptions,
      ...options,
    })
  }
}
