import { useState } from "react";
import axios from "axios";
import { BounceLoader } from "react-spinners";
import ReactMarkdown from "react-markdown";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

const Expander = ({ title, content, source }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="expander">
      <b onClick={() => setIsOpen(!isOpen)} className="expander-title">
        {title}
      </b>
      {isOpen && <p className="expander-content">{content}</p>}
      {isOpen && <p className="expander-content">Source:{source}</p>}
    </div>
  );
};

function QuestionForm() {
  const [questions, setQuestions] = useState("");
  const [answer, setAnswer] = useState("");
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Clear any previous errors
    setAnswer(""); // Clear previous answer
    setDocuments([]); // Clear previous documents

    try {
      console.log("Your question:", questions);
      const response = await api.post("/chat", { message: questions });
      setAnswer(response.data.answer);
      setDocuments(response.data.document || []);
    } catch (err) {
      console.error("Error:", err.message || err.response?.data);
      setError("Failed to fetch response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

const handleIndexing = async (e) => {
  e.preventDefault();
  setAnswer("");
  setError("");
  setIsLoading(true);

  if (!questions.trim()) {
    setError("URL cannot be empty.");
    setIsLoading(false);
    return;
  }

  try {
    const response = await api.post("/indexing", null, {
      params: { url: questions.trim() }, // Send the URL as a query parameter
    });
    setAnswer(response.data.response);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    setError(
      error.response?.data?.error ||
      "Failed to index the website. Please try again."
    );
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="main-container">
      {isLoading ? (
        <div className="loader-container">
          <BounceLoader color="#3498db" />
        </div>
      ) : (
          <form className="form" onSubmit={handleSubmit}>
            <input
                className="form-input"
                type="text"
                value={questions}
                onChange={(e) => setQuestions(e.target.value)}
                placeholder="Ask a question..."
            />
            <div className="button-container">
              <button
                  className="form-button"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!questions.trim()} // Disable if input is empty or only whitespace
              >
                Q&A
              </button>
              <button
                  className="form-button"
                  type="submit"
                  style={{backgroundColor: "#f80202"}}
                  onClick={handleIndexing}
                  disabled={!questions.trim()} // Disable if input is empty or only whitespace
              >
                Index
              </button>
            </div>
          </form>

      )}

      {error && <div className="error-message">{error}</div>}

      {answer && (
          <div className="results-container">
            <div className="results-answer">
              <h1>Answer:</h1>
              <ReactMarkdown>{answer}</ReactMarkdown>
            </div>
          </div>
      )}

      {documents.length > 0 && (
          <div className="results-documents">
            <h1>Documents:</h1>
            <ul>
              {documents.map((doc, index) => (
                  <li key={index}>
                    <Expander
                        title={`${doc.page_content.split(" ").slice(0, 5).join(" ")}...`}
                        content={doc.page_content}
                        source={doc.metadata?.source || "Source not available"}
                    />
                  </li>
              ))}
            </ul>

          </div>
      )}
    </div>
  );
}

export default QuestionForm;
