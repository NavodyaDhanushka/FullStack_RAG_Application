from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from src.qdrant import upload_website_to_collection
from src.rag import get_answer_and_docs

app = FastAPI(
    title="RAG API",
    description="A Simple RAG API",
    version="0.0.1",
)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the payload structure for /chat
class Message(BaseModel):
    message: str

# Define the payload structure for /indexing
class URLPayload(BaseModel):
    url: str


@app.post("/chat", summary="Chat with the RAG API through this endpoint")
async def chat(payload: Message):
    try:
        # Extract the message from the payload
        message = payload.message
        response = get_answer_and_docs(message)

        # Check if an answer exists
        if not response or not response.get("answer"):
            return JSONResponse(
                content={
                    "question": message,
                    "answer": "I'm sorry, I couldn't find an answer to your question. Please try rephrasing or asking something else.",
                    "document": []
                },
                status_code=200
            )

        # If answer exists, return it
        response_content = {
            "question": message,
            "answer": response["answer"],
            "document": [doc.dict() for doc in response["context"]],
        }
        return JSONResponse(content=response_content, status_code=200)

    except Exception as e:
        # Handle unexpected errors
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@app.post("/indexing", summary="Index a website through this endpoint")
async def indexing(url:str):
    try:
        response = upload_website_to_collection(url)
        return JSONResponse(content={"response": response}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
