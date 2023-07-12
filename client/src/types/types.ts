export interface SignupFormInfo {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormInfo {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  content: string;
  from: string | undefined;
  to: string;
  dateTime: number;
}

export class g_chat {
  public chatName?: string;
  constructor(
    public id: string,
    public chatters: User[],
    public messages: Message[],
    public createdAt: number
  ) {
    this.id = id;
    this.chatters = chatters;
    this.messages = messages;
    this.createdAt = Date.now();
  }

  setChatName(chatName: string) {
    this.chatName = chatName;
  }
}
