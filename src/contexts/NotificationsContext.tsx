'use client'

/*
 * DESIGN: Sistema de Notificaciones
 * - Centro de notificaciones
 * - Persistencia en localStorage
 * - Diferentes tipos de notificaciones
 */
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "promo" | "order";
  title: string;
  message: string;
  date: string;
  read: boolean;
  link?: string;
}

interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, "id" | "date" | "read">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("uniclima_notifications");
    if (saved) {
      setNotifications(JSON.parse(saved));
    } else {
      // Notificaciones de ejemplo
      const defaultNotifications: Notification[] = [
        {
          id: "1",
          type: "promo",
          title: "¡Ofertas de Invierno!",
          message: "Hasta 30% de descuento en calderas y repuestos. Válido hasta fin de mes.",
          date: new Date().toISOString(),
          read: false,
          link: "/catalogo"
        },
        {
          id: "2",
          type: "info",
          title: "Bienvenido a Uniclima",
          message: "Gracias por visitar nuestra tienda. Usa el código BIENVENIDO10 para un 10% de descuento.",
          date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          read: false
        }
      ];
      setNotifications(defaultNotifications);
      localStorage.setItem("uniclima_notifications", JSON.stringify(defaultNotifications));
    }
  }, []);

  const saveNotifications = (newNotifications: Notification[]) => {
    setNotifications(newNotifications);
    localStorage.setItem("uniclima_notifications", JSON.stringify(newNotifications));
  };

  const addNotification = (notification: Omit<Notification, "id" | "date" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      read: false
    };
    saveNotifications([newNotification, ...notifications]);
  };

  const markAsRead = (id: string) => {
    saveNotifications(
      notifications.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    saveNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    saveNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAll = () => {
    saveNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationsContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      removeNotification,
      clearAll
    }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error("useNotifications must be used within NotificationsProvider");
  }
  return context;
}
