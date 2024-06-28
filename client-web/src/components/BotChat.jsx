import React, { useEffect } from 'react';

const BotChat = () => {
    useEffect(() => {
        if (window.CozeWebSDK) {
            new window.CozeWebSDK.WebChatClient({
                config: {
                    bot_id: '7385356334826749960',
                },
                componentProps: {
                    title: 'Coze',
                },
            });
        } else {
            console.error('CozeWebSDK is not loaded');
        }
    }, []);

    return (
        <div id="coze-webchat-container">
            {/* The SDK will inject the chat interface here */}
        </div>
    );
};

export default BotChat;
