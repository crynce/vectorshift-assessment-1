// draggableNode.js

export const DraggableNode = ({
  type,
  selectFieldInitialValue,
  inputFieldType,
  name,
  handles,
  selectFields,
  inputField,
  icon,
}) => {
  const onDragStart = (event, data) => {
    const appData = data;
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData),
    );
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <div
      className={type}
      onDragStart={(event) =>
        onDragStart(event, {
          nodeType: type,
          selectFieldInitialValue,
          inputFieldType,
          name,
          handles,
          selectFields,
          inputField,
        })
      }
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      style={{
        cursor: "grab",
        minWidth: "fit-content",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 16px",
        gap: "8px",
        borderRadius: "8px",
        backgroundColor: "#2C2C2C", // Dark card background
        border: "1px solid #4A4A4A", // Subtle border
        color: "#E0E0E0",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        transition: "all 0.2s ease",
        userSelect: "none",
      }}
      draggable
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#3D3D3D";
        e.currentTarget.style.borderColor = "#6A6A6A";
        e.currentTarget.style.transform = "translateY(-1px)";
        e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#2C2C2C";
        e.currentTarget.style.borderColor = "#4A4A4A";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
      }}
    >
      <div style={{ color: "#9F7AEA", display: "flex" }}>{icon}</div>
      <span
        style={{
          fontSize: "14px",
          fontWeight: "500",
          color: "#E0E0E0",
        }}
      >
        {type}
      </span>
    </div>
  );
};
