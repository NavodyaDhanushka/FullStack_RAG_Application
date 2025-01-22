from fastapi import FastAPI
from fastapi.responses import JSONResponse
app = FastAPI(
    title="RAG API",
    description="A Simple RAG API",
    version="0.0.1",
)


@app.post("/chat", deprecated="Chat with the RAG API through this endpoint ")
def chat(message: str):
    return JSONResponse(content = {"Your message": message}, status_code = 200)

@app.get("/")
def test():
    return JSONResponse(content = {"Your message": "chanaka"}, status_code = 200)
