// src/services/socketService.ts
import { MonitoringEvent, SubLevelEvent } from "@/interfaces/events.interface";
import { io, Socket } from "socket.io-client";

class SocketService {
  private static instance: SocketService;
  private socket: Socket | null = null;

  private constructor() {}

  static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  connect(userId: string): void {
    if (!this.socket) {
      this.socket = io(import.meta.env.VITE_SOCKET_SERVER, {
        query: { userId },
        transports: ["websocket"],
      });

      this.socket.on("connect", () => {
        console.log("Socket connected:", this.socket?.id);
      });

      this.socket.on("disconnect", () => {
        console.log("Socket disconnected");
        this.socket = null;
      });

      this.socket.on(SubLevelEvent.LOGIN_USER_EVENT, () => {
        console.log("Login Event emitted");
      });
    }
  }

  disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
  }

  emit(event: MonitoringEvent | SubLevelEvent, data: any): void {
    console.log(event, ":Event");
    this.socket?.emit(event, data);
  }

  on(event: string, callback: (data: any) => void): void {
    this.socket?.on(event, callback);
  }
}

export default SocketService.getInstance();
