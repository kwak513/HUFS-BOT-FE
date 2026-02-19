# 🤖 HUFS Chatbot

An intelligent chatbot designed to provide accurate answers based on official information from Hankuk University of Foreign Studies (HUFS).

![Image](https://github.com/user-attachments/assets/c157af9e-787e-4071-ab7e-5d0ff9e73345)


## 🎯 Key Features
- Information Q&A: Provides precise answers based on extensive university documents, including course handbooks and syllabi.


## ✨ Key Achievements
### 1. Session Management & User Identification
- Challenge: Concerns regarding the inability to track the actual number of users and verify chatbot performance.
- Approach: Implemented user and session ID management using `localStorage` and `uuidv4`. 
- Result: Established a robust foundation for tracking user metrics and monitoring response performance. 
<img width="1413" height="505" alt="Image" src="https://github.com/user-attachments/assets/f04b97c6-99ce-48bb-9057-574e2a224966" />

## ⚙️ Tech Stack
### Frontend  
- TypeScript  
- React  
- Ant Design  
- Netlify  

### Backend  
- Java  
- Spring Boot  
- Docker  
- Hugging Face Spaces  

### AI  
- **Document Loader**: PDFPlumber  
- **Text Splitter**: RecursiveCharacterTextSplitter  
- **Embedding**: nlpai-lab/KURE-v1  
- **Vector Store**: PostgreSQL + PGVector  
- **Retriever**: VectorStoreRetriever  
- **LLM**: Gemini 2.5 Flash Lite  


## 🚀 Getting Started
```bash
# Clone the repository
git clone https://github.com/kwak513/hufs_chatbot_langchain_fe

# Navigate to the directory
cd hufs_chatbot_langchain_fe

# Install dependencies
pnpm install

# Run the development server
pnpm dev
```

## 👥 Developer

| Name   | Role         |
|--------|--------------|
| Chaeyeon Kwak | Full-stack Development |


## 🧩 Related Repository
**Backend**: [Link to Backend Repo](https://github.com/kwak513/hufs_chatbot_langchain_be)


