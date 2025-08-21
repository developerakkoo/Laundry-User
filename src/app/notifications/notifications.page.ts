import { Component, OnInit } from '@angular/core';
import { LogicService } from '../services/logic.service';
import { HapticsService } from '../services/haptics.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  notifications: any[] = [];
  isLoading: boolean = false;

  constructor(private logic: LogicService, private haptics: HapticsService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getNotifications();
  }

  async getNotifications() {
    this.isLoading = true;
    try {
      this.logic.getNotifications().subscribe({
        next: (response: any) => {
          console.log(response);
          this.notifications = response['data'] || [];
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching notifications:', error);
          this.isLoading = false;
        },
      });
    } catch (error) {
      console.error('Error:', error);
      this.isLoading = false;
    }
  }

  deleteNotification(notificationId: string) {
    this.haptics.hapticsImpactMedium();
    this.logic.deleteNotification(notificationId).subscribe({
      next: () => {
        // Remove the deleted notification from the array
        this.notifications = this.notifications.filter(
          (notification) => notification._id !== notificationId
        );
        this.haptics.hapticsImpactLight();
      },
      error: (error) => {
        console.error('Error deleting notification:', error);
        this.haptics.hapticsImpactMedium();
      },
    });
  }

  markAsRead(notificationId: string) {
    this.haptics.hapticsImpactLight();
    // Update local state immediately for better UX
    const notification = this.notifications.find(
      (n) => n._id === notificationId
    );
    if (notification) {
      notification.read = true;
    }

    // Here you would typically call an API to mark as read
    // this.logic.markNotificationAsRead(notificationId).subscribe(...)
  }

  markAllAsRead() {
    this.haptics.hapticsImpactMedium();
    this.notifications.forEach((notification) => {
      notification.read = true;
    });

    // Here you would typically call an API to mark all as read
    // this.logic.markAllNotificationsAsRead().subscribe(...)
  }

  getUnreadCount(): number {
    return this.notifications.filter((n) => !n.read).length;
  }

  trackByNotificationId(index: number, notification: any): string {
    return notification._id;
  }

  parseNotificationContent(content: string): any {
    try {
      // Remove the "new ObjectId(" wrapper and parse the content
      const cleanContent = content
        .replace(/new ObjectId\(/g, '"')
        .replace(/\)/g, '"');
      return JSON.parse(cleanContent);
    } catch (error) {
      console.error('Error parsing notification content:', error);
      return null;
    }
  }

  getNotificationIcon(title: string): string {
    const lowerTitle = title.toLowerCase();

    if (lowerTitle.includes('order') && lowerTitle.includes('ready')) {
      return 'checkmark-circle';
    } else if (lowerTitle.includes('delivery')) {
      return 'car';
    } else if (lowerTitle.includes('pickup')) {
      return 'bag';
    } else if (lowerTitle.includes('confirmed')) {
      return 'checkmark';
    } else if (lowerTitle.includes('process')) {
      return 'sync';
    } else if (lowerTitle.includes('assigned')) {
      return 'person';
    } else {
      return 'notifications';
    }
  }

  getNotificationColor(title: string): string {
    const lowerTitle = title.toLowerCase();

    if (lowerTitle.includes('ready') || lowerTitle.includes('delivered')) {
      return 'success';
    } else if (lowerTitle.includes('process') || lowerTitle.includes('way')) {
      return 'warning';
    } else if (
      lowerTitle.includes('confirmed') ||
      lowerTitle.includes('assigned')
    ) {
      return 'primary';
    } else {
      return 'medium';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours =
      Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      const hours = Math.floor(diffInHours);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  }

  getOrderStatusText(status: number): string {
    const statusMap: { [key: number]: string } = {
      0: 'Pending',
      1: 'Confirmed',
      2: 'Processing',
      3: 'Ready for Pickup',
      4: 'Ready for Delivery',
      5: 'Out for Delivery',
      6: 'Delivered',
      7: 'Completed',
    };
    return statusMap[status] || 'Unknown';
  }

  getOrderStatusColor(status: number): string {
    const colorMap: { [key: number]: string } = {
      0: 'warning',
      1: 'primary',
      2: 'secondary',
      3: 'tertiary',
      4: 'success',
      5: 'warning',
      6: 'success',
      7: 'success',
    };
    return colorMap[status] || 'medium';
  }
}
