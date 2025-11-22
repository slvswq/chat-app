export interface Message {
  _id?: string;
  senderId: string;
  receiverId: string;
  text: string;
}

export interface ChannelMessage {
  _id?: string;
  senderId: {
    _id: string;
    fullName: string;
  };
  channelId: string;
  text: string;
}
