import { IMessage } from "@/interfaces/chatbot.interface";
import {
  ChatEvent,
  IAiMesssage,
  IChatUserMessage,
} from "@/interfaces/events.interface";
import EventEmitter from "eventemitter3";
import { io, Socket } from "socket.io-client";

class ChatSocket {
  private static instance: ChatSocket;
  private url: string;
  private socket: Socket | null = null;
  private chatMessages: IMessage[] = [];
  private isConnected: boolean = false;

  constructor(readonly emitter: EventEmitter, url?: string) {
    this.url = url || (import.meta.env.VITE_CHATBOT_SOCKET_URL as string);
  }

  static getInstance(): ChatSocket {
    if (!ChatSocket.instance) {
      ChatSocket.instance = new ChatSocket(new EventEmitter());
    }

    return ChatSocket.instance;
  }

  connect() {
    if (!this.socket) {
      this.socket = io(this.url, {
        transports: ["websocket"],
        reconnectionAttempts: 8,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
      });

      this.socket.on("connect", () => {
        this.isConnected = true;
        this.emitter.emit("isConnected", this.isConnected);
        console.log("Chatbot Socket connected:", this.socket?.id);
      });

      this.socket.on("disconnect", () => {
        console.log("Chat Socket disconnected.....");
        this.isConnected = false;
        this.emitter.emit("isConnected", this.isConnected);
        this.socket = null;
      });

      this.socket.on(ChatEvent.AI_MESSAGE, (data: IAiMesssage) => {
        this.chatMessages.push({
          isAiMessage: true,
          conversationId: data.conversation_id,
          text: data.reply_text,
        });

        console.log(`captured ai message`, data);

        this.emitter.emit("new_message", this.chatMessages);
      });
    }
  }

  disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
  }

  emit(event: ChatEvent, payload: IChatUserMessage): void {
    if (!this.socket) {
      this.connect();
    }

    this.socket?.emit(event, payload);
    console.log("event emitted: ", event, payload);
  }

  sendMessage(payload: IChatUserMessage): void {
    this.emit(ChatEvent.USER_MESSAGE, payload);

    this.chatMessages = [
      ...this.chatMessages,
      {
        isAiMessage: false,
        text: payload.query,
        conversationId: payload.conversation_id,
      },
    ];

    this.emitter.emit("new_message", this.chatMessages);
  }
}

export default ChatSocket.getInstance();
