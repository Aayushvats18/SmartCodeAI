import { useState, useEffect } from 'react';
import "prismjs/themes/prism-tomorrow.min.css";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios';
import './App.css';

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`);
  const [review, setReview] = useState("");

  useEffect(() => {
    Prism.highlightAll(); // Ensure syntax highlighting runs on mount
  }, []);

  async function reviewCode() {
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code });
  
      if (response.data && response.data.review) {
        setReview(response.data.review);
      } else {
        setReview("Error: Empty response from the server.");
      }
    } catch (error) {
      console.error("❌ Network error:", error);
      setReview(`Error: ${error.message}`);
    }
  }
  
  
  

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={code => Prism.highlight(code, Prism.languages.javascript, "javascript")}
            padding={10}
            style={{
              fontFamily: '"Fira Code", "Fira Mono", monospace',
              fontSize: 16,
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "100%",
              width: "100%",
            }}
          />
        </div>
        <button onClick={reviewCode} className="review">Review</button>
      </div>
      <div className="right">
        <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
      </div>
    </main>
  );
}

export default App;
