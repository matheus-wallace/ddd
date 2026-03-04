import { Notification } from '../../enterprise/entitites/notifications'

export interface NotificationsRepository {
  create(notification: Notification): Promise<void>
}
