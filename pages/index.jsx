import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json'
TimeAgo.addDefaultLocale(en);

const socket = io();
const timeAgo = new TimeAgo('en-US');

const Page = () => {
    const
        [user, setUser] = useState({}),
        [message, setMessage] = useState(""),
        [messages, setMessages] = useState([]);

    function sendMessage(e) {
        e.preventDefault();
        socket.emit('newMsg', {
            sender: user,
            content: message,
            time: new Date()
        });

        setMessage("");
    }

    socket.on('updateMessages', messagesStore => {
        setMessages(messagesStore);
        console.log(messages);
    })

    useEffect(() => {
        const cookie = require('cookie-cutter');

        let saveUser = {
            id: uuidv4(),
            username: `User${Math.floor(Math.random() * 1000) + 100}`
        },
        oldUserID = cookie.get('userID');
        
        if (oldUserID) setUser({
            id: oldUserID,
            username: cookie.get('userName')
        });
        else {
            cookie.set('userID', saveUser.id);
            cookie.set('userName', saveUser.username);
            setUser(saveUser)
        }
    },[])

    const MessageContainer = ({ username = "User", message = "[msg content]", time = "[time]", self = false }) => {
        if (self) return (
            <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                <div>
                    <p className="text-scheme-light mb-1">{username}</p>
                    <div className="bg-scheme-primary p-3 rounded-l-lg rounded-br-lg">
                        <p className="text-sm">{message}</p>
                    </div>
                    <span className="text-xs text-scheme-light leading-none">{time}</span>
                </div>
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
            </div>
        );
        else return (
            <div className="flex w-full mt-2 space-x-3 max-w-xs">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                <div>
                    <p className="text-scheme-light mb-1">{username}</p>
                    <div className="bg-scheme-tertiary text-scheme-light p-3 rounded-r-lg rounded-bl-lg">
                        <p className="text-sm">{message}</p>
                    </div>
                    <span className="text-xs text-scheme-light leading-none">{time}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen w-screen relative flex">
            <div className="flex flex-col w-5/6 h-5/6 overflow-hidden bg-scheme-secondary text-scheme-dark m-auto shadow-lg shadow-scheme-dark rounded-xl">
                <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
                    {messages.map((m, key) => {
                        return (
                        <MessageContainer username={m.sender.username} message={m.content} self={m.sender.id == user.id} time={timeAgo.format(new Date(m.time), 'twitter')} key={key} />
                        )
                    })}
                    {/* <MessageContainer />
                    <MessageContainer self={true} />
                    <MessageContainer /> */}
                </div>
                
                <div className="bg-scheme-tertiary p-4">
                    <form onSubmit={sendMessage}>
                        <input className="flex items-center h-10 w-full rounded px-3 text-sm" type="text" placeholder="Type your message…" value={message} onChange={e => {setMessage(e.target.value)}} />
                    </form>
                </div>
            </div>
        </div>
    )
}

Page.getInitialProps = async (ctx) => {
    return {
        title: "Chat"
    }
}

export default Page;