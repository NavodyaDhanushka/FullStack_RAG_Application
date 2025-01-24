
# FullStack_RAG_Application

This project is a FullStack Application designed to provide users with an AI-powered Q&A system and web content indexing functionality. The frontend is developed using React, while the backend is built with Python and integrates advanced AI capabilities.

#### Key Features

Question and Answer Functionality: Users can input questions and receive AI-generated, contextually relevant answers.
Web Content Indexing: Users can provide website URLs, and the application scrapes and indexes the content for future queries.
Expandable Document Display: Indexed content is displayed with expandable sections, allowing users to explore detailed information and its source.
AI-Powered Backend: The backend utilizes Python, LangChain, and Qdrant to enable content indexing and efficient document retrieval.
User-Friendly Interface: The React frontend ensures a seamless and intuitive user experience for asking questions and exploring results.

#### Target Audience


Researchers and Professionals: For quick retrieval and summarization of web content.
Content Creators and Bloggers: To organize and analyze content from specific websites.
Developers and Data Enthusiasts: To explore AI-powered Q&A systems for integration or research purposes.
This application serves anyone who wants a smarter way to index and retrieve meaningful insights from web content.
# API Reference

### Base URL

```http
http://localhost:8000

```
### Endpoints

#### Chat with RAG
```http
  POST /chat
```
#### Request Body

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `message` | `string` | **Required**. The question to ask |

Description: Chat with the RAG API by sending a question.

#### Response:
200 OK

Returns the answer to the question and related documents (if available).
```json
{
  "question": "Your question here",
  "answer": "Generated answer",
  "document": [
    {
      "page_content": "Relevant content",
      "source": "Document source URL"
    }
  ]
}
```

500 Internal Server Error

Returns an error message if something goes wrong.

#### Index a Website
```http
  POST /indexing
```
Description: Index content from a website into the collection.

#### Request Body

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `url`      | `string` | **Required**. URL of the website to index |

#### Response:
 200 OK

Returns a confirmation of successful indexing.
```json
{
  "response": "Successfully uploaded X documents to collection Web from [URL]"
}
```
500 Internal Server Error

Returns an error message if indexing fails.


## Installation(Frontend)

Follow these steps to install Frontend and set up the project

#### Clone the repository
```bash
git clone https://github.com/NavodyaDhanushka/FullStack_RAG_Application.git
```
#### Navigate to the project directory
```bash
cd FullStack_RAG_Application/frontend
```
#### Install the required dependencies using npm
```bash
npm install
```
#### Start the development server
```bash
npm start
```
#### Access the application in your browser at
```bash
git clone https://github.com/NavodyaDhanushka/FullStack_RAG_Application.git
```
#### Clone the repository
```arduion
http://localhost:3000
```
## Installation(Backend with Poetry)

Follow these steps to install Backend using Poetry and set up the project

#### Clone the repository
```bash
git clone https://github.com/NavodyaDhanushka/FullStack_RAG_Application.git
```
#### Navigate to the project directory
```bash
cd FullStack_RAG_Application/backend
```
#### Install Poetry (if not already installed)
poetry is required to manage dependencies
```bash
curl -sSL https://install.python-poetry.org | python3 -
```
#### Install dependencies using Poetry
Poetry will automatically create and use its own virtual environment.
```bash
poetry install
```
#### Activate the Poetry environment
```bash
poetry shell
```
#### Set up environment variables
Create a .env file in the backend directory with the following contents
```arduion
OPENAI_API_KEY=your_openai_api_key
QDRANT_API_KEY=your_qdrant_api_key
QDRANT_URL=your_qdrant_url
```
#### Run the backend server
```arduion
poetry run uvicorn main:app --reload
```
#### Access the API documentation
```arduion
http://localhost:8000/docs
```

    
