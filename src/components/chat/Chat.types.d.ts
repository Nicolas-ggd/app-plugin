// ConversationType is a description of the data to be sent when creating a new message,
// or it is a description of the data we will receive after sending the message.

export interface ConversationType {
  participants: [string | undefined, string | undefined],
  messages: 
    {
      sender: string | undefined;
      message: string | undefined;
      recipient: string | undefined;
    }[]
  ;
}

// ChatType is the description of the child component enclosed in its parentheses

export interface ChatType {
  children: React.ReactNode;
}

export interface ConversationResponse {
  messages: {
    sender: string | undefined;
    message: string;
    recipient: string | undefined;
  }[];
}
