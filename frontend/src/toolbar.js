// toolbar.js

import { Position } from "reactflow";
import { DraggableNode } from "./draggableNode";

import {
  MdInput,
  MdOutput,
  MdShortText,
  MdSmartToy,
  MdAttachFile,
  MdSearch,
  MdBookmark,
  MdNotificationAdd,
} from "react-icons/md";

const NODE_LIBRARY = [
  {
    type: "Input",
    inputFieldType: "text",
    inputField: false,
    name: "custom",
    selectFieldInitialValue: "Text",
    selectFields: ["Text", "File"],
    handles: [{ type: "source", position: Position.Right }],
    icon: <MdInput size={20} />,
  },
  {
    type: "LLM",
    inputField: true,
    name: "custom",
    fieldInitialValue: null,
    selectFields: ["text"],
    handles: [
      { type: "target", position: Position.Left },
      { type: "target", position: Position.Left },
      { type: "source", position: Position.Right },
    ],
    icon: <MdSmartToy size={20} />,
  },
  {
    type: "Output",
    inputFieldType: "text",
    inputField: true,
    name: "Output",
    selectFieldInitialValue: "Text",
    selectFields: ["Text", "Image"],
    handles: [{ type: "target", position: Position.Left }],
    icon: <MdOutput size={20} />,
  },
  {
    type: "Text",
    inputFieldType: "textarea",
    inputField: true,
    name: "Custom",
    selectFieldInitialValue: "Text",
    selectFields: ["Text", "File"],
    handles: [
      { type: "target", position: "left" },
      { type: "source", position: "right" },
    ],
    icon: <MdShortText size={20} />,
  },
  {
    type: "File",
    inputFieldType: "file",
    inputField: true,
    name: "File",
    selectFieldInitialValue: "File",
    selectFields: ["Text", "File"],
    handles: [
      { type: "source", position: Position.Right },
      { type: "target", position: Position.Left },
    ],
    icon: <MdAttachFile size={20} />,
  },
  {
    type: "GoogleSearch",
    inputFieldType: "text",
    inputField: true,
    name: "Google Search",
    selectFieldInitialValue: "Text",
    selectFields: ["Text", "Image"],
    handles: [
      { type: "source", position: Position.Right },
      { type: "target", position: Position.Left },
    ],
    icon: <MdSearch size={20} />,
  },
  {
    type: "wikipedia",
    inputFieldType: "text",
    inputField: true,
    name: "Wikipedia",
    selectFieldInitialValue: "Text",
    selectFields: ["Text"],
    handles: [
      { type: "source", position: Position.Right },
      { type: "target", position: Position.Left },
    ],
    icon: <MdBookmark size={20} />,
  },
  {
    type: "notification",
    inputFieldType: "text",
    inputField: true,
    name: "Wikipedia",
    selectFieldInitialValue: "Text",
    selectFields: ["Text"],
    handles: [{ type: "target", position: Position.Left }],
    icon: <MdNotificationAdd size={20} />,
  },
  {
    type: "imageSearch",
    inputFieldType: "text",
    inputField: true,
    name: "Wikipedia",
    selectFieldInitialValue: "Text",
    selectFields: ["Text"],
    handles: [
      { type: "target", position: Position.Left },
      { type: "target", position: Position.Right },
    ],
    icon: <MdNotificationAdd size={20} />,
  },
];
console.log("hi");
export const PipelineToolbar = () => {
  return (
    <div
      style={{
        padding: "10px",
        height: "80px",
        width: "100vw",
        backgroundColor: "#1C2536",
        borderBottom: "1px solid #430B8A",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "20px",
        zIndex: 100,
        boxSizing: "border-box", // Ensure padding doesn't affect width
      }}
    >
      <div
        style={{
          color: "#E6DDFD",
          fontSize: "18px", // Slightly larger for header
          fontWeight: "600",
          marginRight: "20px",
        }}
      >
        <span
          style={{
            display: "inline-block",
          }}
        >
          Pipeline Toolbar
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
        }}
      >
        {NODE_LIBRARY.map((config) => (
          <DraggableNode
            key={config.type}
            type={config.type}
            selectFieldInitialValue={config.selectFieldInitialValue}
            inputFieldType={config.inputFieldType}
            selectFields={config.selectFields}
            name={config.name}
            handles={config.handles}
            icon={config.icon}
            inputField={config.inputField}
          />
        ))}
      </div>
    </div>
  );
};
