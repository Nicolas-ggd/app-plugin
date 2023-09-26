export type ConversationType = {
  participants: [string | undefined, string | undefined];
  messages: [{
    sender: string | undefined;
    message: string;
    recipient: string | undefined;
  }];
};
