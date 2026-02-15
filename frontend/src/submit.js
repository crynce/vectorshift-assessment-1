import { useState } from "react";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { MdClose, MdCheckCircle, MdError, Mdpending } from "react-icons/md";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

const ResultPopup = ({ result, onClose }) => {
  if (!result) return null;

  const isSuccess = result.status !== "error";

  return (
    <div
      style={{
        position: "fixed",
        top: "100px", // Below toolbar
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#1E1E2E",
        color: "#CDD6F4",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
        border: "1px solid #45475A",
        zIndex: 1000,
        minWidth: "300px",
        animation: "fadeIn 0.3s ease-out",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
          borderBottom: "1px solid #313244",
          paddingBottom: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {isSuccess ? (
            <MdCheckCircle size={24} color="#A6E3A1" />
          ) : (
            <MdError size={24} color="#F38BA8" />
          )}
          <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "600" }}>
            {isSuccess ? "Pipeline Analysis" : "Error"}
          </h3>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            color: "#6C7086",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <MdClose size={20} />
        </button>
      </div>

      {isSuccess ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Number of Nodes:</span>
            <span style={{ fontWeight: "bold", color: "#89B4FA" }}>
              {result.num_nodes}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Number of Edges:</span>
            <span style={{ fontWeight: "bold", color: "#89B4FA" }}>
              {result.num_edges}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Is DAG:</span>
            <span
              style={{
                fontWeight: "bold",
                color: result.is_dag ? "#A6E3A1" : "#F38BA8",
              }}
            >
              {result.is_dag ? "Yes" : "No"}
            </span>
          </div>
        </div>
      ) : (
        <div style={{ color: "#F38BA8" }}>{result.message}</div>
      )}
    </div>
  );
};

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });

      const data = await response.json();
      console.log(data);
      setResult(data);
    } catch (error) {
      console.error("Error parsing pipeline:", error);
      setResult({
        status: "error",
        message: "Failed to parse pipeline. Check console.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          style={{
            padding: "10px 20px",
            background: loading ? "#6c757d" : "#430B8A",
            color: "white",
            borderRadius: "10px",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "bold",
            transition: "background 0.2s",
          }}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
      {result && (
        <ResultPopup result={result} onClose={() => setResult(null)} />
      )}
    </>
  );
};
