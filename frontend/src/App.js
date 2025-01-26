import logoo from './logoo.svg';
import './App.css';
import QuestionForm from "./QuestionForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logoo} className="App-logo" alt="logo" />
        <p>
          Welcome to Fullstack-RAG!
        </p>
        <QuestionForm/>
      </header>
    </div>
  );
}

export default App;
