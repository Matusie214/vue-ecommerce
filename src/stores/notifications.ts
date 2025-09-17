import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { StockNotification } from '@/lib/supabase'
import { ApiService } from '@/services/api'

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref<StockNotification[]>([])

  const loading = ref(false)
  const error = ref<string | null>(null)

  const loadProductNotifications = async (productId: number) => {
    loading.value = true
    error.value = null
    try {
      const data = await ApiService.getStockNotifications(productId)
      // Update only notifications for this product
      notifications.value = notifications.value.filter(n => n.product_id !== productId)
      notifications.value.push(...data)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load notifications'
      console.error('Failed to load notifications:', err)
    } finally {
      loading.value = false
    }
  }

  const addStockNotification = async (notification: Omit<StockNotification, 'id' | 'created_at' | 'status'>) => {
    try {
      const newNotification = await ApiService.addStockNotification(notification)
      notifications.value.push(newNotification)
      return newNotification
    } catch (err) {
      // Fallback to local storage
      const localNotification: StockNotification = {
        ...notification,
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        status: 'pending'
      }
      notifications.value.push(localNotification)
      return localNotification
    }
  }

  const getProductNotifications = (productId: number) => {
    return notifications.value.filter(notification => notification.product_id === productId)
  }

  const updateNotificationStatus = async (id: string, status: StockNotification['status']) => {
    try {
      await ApiService.updateNotificationStatus(id, status)
      const notification = notifications.value.find(n => n.id === id)
      if (notification) {
        notification.status = status
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update notification'
      throw err
    }
  }

  const deleteNotification = async (id: string) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  return {
    notifications,
    loading,
    error,
    loadProductNotifications,
    addStockNotification,
    getProductNotifications,
    updateNotificationStatus,
    deleteNotification
  }
})