// outputNode.js

import { useEffect, useRef, useState } from "react";
import { Handle, Position } from "reactflow";
import { useStore } from "../store";
import { shallow } from "zustand/shallow";

export const GeneralNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.name || "");
  const [selectFieldType, setSelectFieldType] = useState(
    data.outputType || "Text",
  );
  const { nodes, onConnect } = useStore(
    (state) => ({
      nodes: state.nodes,
      onConnect: state.onConnect,
    }),
    shallow,
  );
  const [showHelper, setShowHelper] = useState(false);
  const textareaRef = useRef(null);
  useEffect(() => {
    console.log(nodes);
  });

  const handleNameChange = (e, inputType) => {
    const value = e.target.value;
    setCurrName(value);
  };
  const handleTextArea = (e) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
      if (textareaRef.current.value.endsWith("{{")) {
        setShowHelper(true);
      } else {
        setShowHelper(false);
      }
    }
  };

  const handleVariableSelect = (sourceNode) => {
    textareaRef.current.value += sourceNode.id + "}}";
    setShowHelper(false);

    if (sourceNode.id && id) {
      onConnect({
        source: sourceNode.id,
        target: id,
        sourceHandle: `${sourceNode.id}-value`,
        targetHandle: `${id}-value`,
      });
    }
  };

  const handleTypeChange = (e) => {
    setSelectFieldType(e.target.value);
  };

  // Define colors for different node types
  const nodeColors = {
    Input: { border: "#4fd1c5", bg: "#1a202c" }, // Teal/Dark
    LLM: { border: "#9f7aea", bg: "#1a202c" }, // Purple/Dark
    Output: { border: "#68d391", bg: "#1a202c" }, // Green/Dark
    Text: { border: "#f6ad55", bg: "#1a202c" }, // Orange/Dark
    File: { border: "#63b3ed", bg: "#1a202c" }, // Blue/Dark
    GoogleSearch: { border: "#63b3ed", bg: "#1a202c" }, // Blue/Dark
    notification: { border: "#63b3ed", bg: "#1a202c" }, // Blue/Dark
    wikipedia: { border: "#63b3ed", bg: "#1a202c" }, // Blue/Dark
    imageSearch: { border: "#63b3ed", bg: "#1a202c" }, // Blue/Dark
  };

  const nodeType = data.nodeType || "customInput"; // Fallback
  console.log(nodeType);
  const colors = nodeColors[nodeType] || nodeColors.customInput;

  return (
    <div
      style={{
        width: 200,
        height: "auto",
        border: `1px solid ${colors.border}`,
        paddingBottom: "10px",
        backgroundColor: colors.bg,
        color: "#FFFFFF",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        position: "relative",
      }}
    >
      {data.handles.map((handle, i) => {
        if (handle.position === Position.Left) {
          return (
            <Handle
              key={`${id}-${handle.position}-${i}`}
              type={handle.type}
              position={handle.position}
              id={`${id}-${handle.type}-${i}`}
              style={{
                background: colors.border,
                top: `${(100 / 3) * (i + 1)}%`,
              }}
            />
          );
        } else {
          return (
            <Handle
              key={`${id}-${handle.position}-${i}`}
              type={handle.type}
              position={handle.position}
              id={`${id}-${handle.type}-${i}`}
              style={{ background: colors.border }}
            />
          );
        }
      })}

      <div className="node-type">
        <span style={{ fontWeight: "600" }}>{data.nodeType}</span>
      </div>

      <div
        style={{ display: "flex", flexDirection: "column", gap: "5px" }}
        className="node-main-data-block"
      >
        <label style={{ fontSize: "12px", color: "#E6DDFD" }}>Name:</label>
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
          style={{
            alignSelf: "center",
            width: "100%",
            marginTop: "4px",
            padding: "4px",
            borderRadius: "4px",
            border: "1px solid #430B8A",
            backgroundColor: "#1C2536",
            color: "#FFFFFF",
          }}
        />
        {data.nodeType !== "Input" && (
          <textarea
            ref={textareaRef}
            type="text"
            onInput={handleTextArea}
            rows={1}
            style={{
              alignSelf: "center",
              width: "100%",
              marginTop: "4px",
              padding: "4px",
              borderRadius: "4px",
              border: "1px solid #430B8A",
              backgroundColor: "#1C2536",
              color: "#FFFFFF",
            }}
          ></textarea>
        )}
        <label style={{ fontSize: "12px", color: "#E6DDFD" }}>
          Type:
          <select
            value={selectFieldType}
            onChange={handleTypeChange}
            style={{
              width: "100%",
              marginTop: "4px",
              padding: "4px",
              borderRadius: "4px",
              border: "1px solid #430B8A",
              backgroundColor: "#1C2536",
              color: "#FFFFFF",
            }}
          >
            {data.selectFields?.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
        </label>
        {data.inputFieldType === "file" && (
          <input
            type="file"
            // onChange={(e) => {
            //   // Handle file selection
            // }}
            value=""
            style={{
              alignSelf: "center",
              width: "100%",
              marginTop: "4px",
              padding: "4px",
              borderRadius: "4px",
              border: "1px solid #430B8A",
              backgroundColor: "#1C2536",
              color: "#FFFFFF",
            }}
          />
        )}
      </div>
      {showHelper && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            background: "#1C2536",
            border: "1px solid #BC7DFF",
            zIndex: 10,
            width: "100%",
            maxHeight: "100px",
            overflowY: "auto",
            borderRadius: "4px",
          }}
        >
          {nodes
            .filter(
              (n) =>
                n.id !== id &&
                n.data.handles.filter((handle) => handle.type === "source")
                  .length,
            )
            .map((n) => (
              <div
                key={n.id}
                onClick={() => handleVariableSelect(n)}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  borderBottom: "1px solid #333",
                  fontSize: "12px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#2C3546")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                {n.data.label || n.id}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
