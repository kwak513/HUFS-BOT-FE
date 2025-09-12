import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Layout, Input, Button, List, Spin, FloatButton } from 'antd';
import { SendOutlined, ClearOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';

import logo from '../assets/logo.png'
import chatbotImage from '../assets/HUFSChatbot.png'

const { Header, Content, Footer } = Layout;
const { TextArea } = Input;


// const API_BASE_URL = 'http://localhost:8000';
// const API_BASE_URL = "https://hufs-chatbot-langchain-be-1.onrender.com"
const API_BASE_URL = 'https://kwak513-hufschatbotdocker.hf.space';


interface Message {
    role: 'user' | 'ai';
    content: string;
}

const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
};

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#000',
    height: 64,
    paddingInline: 24,
    lineHeight: '64px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #e8e8e8',
    display: 'flex',
    justifyContent: 'space-between', 
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1,
};

const contentStyle: React.CSSProperties = {
    flex: 1,
    padding: '24px',
    paddingBottom: '150px',
    maxWidth: '960px',
    width: '100%',
    margin: '0 auto',
};

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '12px 24px',
    backgroundColor: '#fff',
    borderTop: '1px solid #e8e8e8',
    position: 'sticky',
    bottom: 0,
    zIndex: 1,
};

const messageContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
};

const messageItemStyle = (role: 'user' | 'ai'): React.CSSProperties => ({
    display: 'flex',
    justifyContent: role === 'user' ? 'flex-end' : 'flex-start',
    borderBottom: 'none',
});

const messageContentStyle = (role: 'user' | 'ai'): React.CSSProperties => ({
    maxWidth: '70%',
    padding: '10px 15px',
    borderRadius: '15px',
    backgroundColor: role === 'user' ? '#e8f0fe' : '#ffffff',
    color: role === 'user' ? '#1f1f1f' : '#000',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    whiteSpace: 'pre-wrap',
});

function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // 사용자 ID 설정
        let currentUserId = localStorage.getItem('hufs-chatbot-userId');
        if (!currentUserId) {
            currentUserId = uuidv4();
            localStorage.setItem('hufs-chatbot-userId', currentUserId);
        }

        setUserId(currentUserId); 

        
        setSessionId(uuidv4());
        setMessages([
        {
            role: 'ai',
            content: '안녕하세요! 한국외국어대학교(서울) 챗봇입니다. 무엇을 도와드릴까요? "유전자와현대생활 수업에 대해 알려줘"처럼 구체적으로 질문해주시면 더 정확한 답변을 드릴 수 있습니다. 🏫'
        },
        ]);
    }, []);

    const sendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const userMessage: Message = {
        role: 'user',
        content: inputMessage.trim()
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
        const response = await fetch(`${API_BASE_URL}/api/chat`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            message: userMessage.content,
            session_id: sessionId,
            user_id: userId, 
            }),
        });

        const data = await response.json();

        if (data.success) {
            const aiMessage: Message = {
            role: 'ai',
            content: data.response
            };
            setMessages((prev) => [...prev, aiMessage]);
        } else {
            const errorMessage: Message = {
            role: 'ai',
            content: `오류: ${data.response}`
            };
            setMessages((prev) => [...prev, errorMessage]);
        }
        } catch (error) {
        console.error('채팅 오류:', error);
        const errorMessage: Message = {
            role: 'ai',
            content: '죄송합니다. 서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.'
        };
        setMessages((prev) => [...prev, errorMessage]);
        } finally {
        setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
        }
    };

    const clearChat = () => {
        setSessionId(uuidv4());
        setMessages([
        {
            role: 'ai',
            content: '채팅이 초기화되었습니다. 새로운 대화를 시작해보세요! 👋'
        },
        ]);
    };

    return (
        <Layout style={containerStyle}>


    <Header style={headerStyle}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <img
        src={logo}
        alt="HUFS Logo"
        style={{ height: 40 }}
        />
        
        <img
            src={chatbotImage} 
            alt="HUFS Chatbot"
            style={{ height: 30 }} 
        />

        
    </div>
    
    <Button onClick={clearChat} icon={<ClearOutlined />} style={{ marginLeft: 'auto' }}>
        초기화
    </Button>
    </Header>


        <Content style={contentStyle}>
            <List
            style={messageContainerStyle}
            itemLayout="horizontal"
            dataSource={messages}
            renderItem={(message) => (
                <List.Item style={messageItemStyle(message.role)}>
                <div style={messageContentStyle(message.role)}>
                    {message.content}
                </div>
                </List.Item>
            )}
            />
            {isLoading && (
            <div style={{ ...messageItemStyle('ai'), marginTop: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <Spin />
                </div>
            </div>
            )}
            <div ref={messagesEndRef} />
        </Content>
        <Footer style={footerStyle}>
            <div style={{ maxWidth: '960px', width: '100%', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <TextArea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onPressEnter={handleKeyPress}
                placeholder="한국외국어대학교(서울)에 대해 궁금한 점을 물어보세요."
                autoSize={{ minRows: 2, maxRows: 4 }}
                disabled={isLoading}
                style={{ flex: 1 }}
                />
                <Button
                type="primary"
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                icon={<SendOutlined />}
                style={{ backgroundColor: '#002f6c', borderColor: '#002f6c' }}
                >
                {/* 전송 */}
                </Button>
            </div>
            </div>
        </Footer>

        <FloatButton.BackTop visibilityHeight={0}  style={{ bottom: 100 }}/>
        </Layout>

        
    );
    }

    export default ChatPage;