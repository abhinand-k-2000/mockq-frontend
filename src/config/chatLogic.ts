interface IMessage {
    _id: string
    sender: {
        _id: string;
        name: string
    },
    content: string
}

export const isSameSender = (messages: IMessage[], m: IMessage, i: number, userId: string) => {
    return (
        i < messages.length - 1 &&
        (messages[i + 1].sender._id !== m.sender._id ||
          messages[i + 1].sender._id === undefined) &&
        messages[i].sender._id !== userId
      );
}



export const isSameSenderMargin = (messages: IMessage[], m: IMessage, i: number, userId: string) => {
    if(i < messages.length - 1 && messages[i+1].sender._id === m.sender._id && messages[i].sender._id !== userId){
        return 60;
    }else if((i < messages.length - 1 && messages[i+1].sender._id !== m.sender._id && messages[i].sender._id !== userId)
    || (i === messages.length - 1 && messages[i].sender._id !== userId)){
        return 0;
    }
    else return 'auto'
}

export const isLastMessage = (messages: IMessage[], i: number, userId: string) => {
    return (
        i === messages.length - 1 &&
        messages[messages.length - 1].sender._id !== userId &&
        messages[messages.length - 1].sender._id
      );
}

export const isSameUser = (messages: IMessage[], m: IMessage, i: number) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
  };
