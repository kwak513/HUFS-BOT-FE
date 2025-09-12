# HUFS챗봇  

한국외국어대학교의 정보를 바탕으로 질문에 답변하는 챗봇입니다.  

![Image](https://github.com/user-attachments/assets/c157af9e-787e-4071-ab7e-5d0ff9e73345)


## 🎯 핵심 기능  
- **정보 질의응답**: 수강편람, 강의계획서 등 방대한 문서를 기반으로 정확한 답변 제공  
- **대화 이력 관리**: 세션별 사용자 대화 이력 추적 및 분석  



## ✨ 주요 성과
### 1. 세션 관리 및 사용자 식별  
- **문제**: 실제 사용자 수와 챗봇 성능을 확인할 수 없다는 우려 발생  
- **접근**: `localStorage`, `uuidv4`를 활용해 사용자 ID와 세션 ID를 생성·관리  
- **성과 및 결론**: 챗봇 사용자 수와 답변 성능을 추적할 수 있는 기반 마련  
<img width="1413" height="505" alt="Image" src="https://github.com/user-attachments/assets/f04b97c6-99ce-48bb-9057-574e2a224966" />

## ⚙️ 기술 스택  
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


## 🚀 실행 방법  
```bash
# 프로젝트 클론
git clone https://github.com/kwak513/hufs_chatbot_langchain_fe

# 디렉토리 이동
cd hufs_chatbot_langchain_fe

# 패키지 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

## 👥 개발자 소개

| 이름   | 역할         |
|--------|--------------|
| 곽채연 | Frontend / Backend 개발 |


## 🧩 관련 레포지토리
**Backend**: [Link to Backend Repo](https://github.com/kwak513/hufs_chatbot_langchain_be)


