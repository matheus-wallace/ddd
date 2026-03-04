import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repositories'
import { Notification } from '@/domain/notification/enterprise/entitites/notification'

export class InMemoryNotificationsRepository implements NotificationsRepository {
  public items: Notification[] = []

  async findByID(id: string) {
    const notification = this.items.find((item) => item.id.toString() === id)

    if (!notification) {
      return null
    }

    return notification
  }

  async create(notification: Notification) {
    this.items.push(notification)
  }

  async save(notification: Notification) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === notification.id,
    )

    this.items[itemIndex] = notification
  }
}
