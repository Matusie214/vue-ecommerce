import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { StockNotification } from '@/lib/supabase'

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref<StockNotification[]>([])

  const addStockNotification = (notification: Omit<StockNotification, 'id' | 'created_at' | 'status'>) => {
    const newNotification: StockNotification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString(),
      status: 'pending'
    }
    notifications.value.push(newNotification)
    return newNotification
  }

  const getProductNotifications = (productId: number) => {
    return notifications.value.filter(notification => notification.product_id === productId)
  }

  const updateNotificationStatus = (id: string, status: StockNotification['status']) => {
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
      notification.status = status
    }
  }

  const deleteNotification = (id: string) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  return {
    notifications,
    addStockNotification,
    getProductNotifications,
    updateNotificationStatus,
    deleteNotification
  }
})