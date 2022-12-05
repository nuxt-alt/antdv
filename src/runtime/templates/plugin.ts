import { defineNuxtPlugin } from '#imports'
import { message, notification } from 'ant-design-vue';

export default defineNuxtPlugin(() => {
    return {
        provide: {
           message: message,
           notification: notification      
        }
    }
})