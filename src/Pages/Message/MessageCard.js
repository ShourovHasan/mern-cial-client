import React from 'react';

const MessageCard = ({ myLMessage, oppositeMessage }) => {
    // const { myPhotoURL, myMessage, publishedTime } = myLMessage;
    // const { mP=myPhotoURL, mM=myMessage, pt=publishedTime } = oppositeMessage;
    // console.log(myMessage);
    return (
        <div>
            {
                myLMessage?._id &&
                < div className="chat chat-end">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src={myLMessage?.myPhotoURL} alt='' />
                        </div>
                    </div>
                    <div className="chat-header">
                        <time className="text-xs opacity-50">{myLMessage?.publishedTime}</time>
                    </div>
                    <div className="chat-bubble bg-blue-900 text-white">
                        {myLMessage?.myMessage}
                    </div>
                </div>
            }
            
            {
                oppositeMessage?._id &&
                <div className="chat chat-start">

                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src={oppositeMessage?.myPhotoURL} alt='' />
                        </div>
                    </div>
                    <div className="chat-header">
                        <time className="text-xs opacity-50">{oppositeMessage?.publishedTime}</time>
                    </div>
                        <div className="chat-bubble">{oppositeMessage?.myMessage}</div>
                    <div className="chat-footer opacity-50">
                    </div>
                </div>
            }
            
        </div>
    );
};

export default MessageCard;