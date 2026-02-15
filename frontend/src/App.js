import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <PipelineToolbar />
      <div style={{ flex: 1, position: "relative", width: "100%" }}>
        <PipelineUI />
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            zIndex: 10,
          }}
        >
          <SubmitButton />
        </div>
      </div>
    </div>
  );
}

export default App;
