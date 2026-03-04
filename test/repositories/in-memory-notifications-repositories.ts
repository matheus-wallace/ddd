import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repositories'
import { Notification } from '@/domain/notification/enterprise/entitites/notifications'

export class InMemoryNotificationsRepository implements NotificationsRepository {
  public items: Notification[] = []

  async create(notification: Notification) {
    this.items.push(notification)
  }
}
