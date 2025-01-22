from fastapi import FastAPI
from fastapi.responses import JSONResponse
from src.rag import get_answer_and_docs

app = FastAPI(
    title="RAG API",
    description="A Simple RAG API",
    version="0.0.1",
)

@app.post("/chat", deprecated="Chat with the RAG API through this endpoint ")
def chat(message: str):
    response = get_answer_and_docs(message)
    response_content = {
        "question": message,
        "answer": response["answer"],
        "document": [doc.dict() for doc in response["context"]],
    }
    return JSONResponse(content = response_content, status_code = 200)

