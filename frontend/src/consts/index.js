export const nodeCategories = {
  general: [
    {
      type: "customInput",
      label: "Input",
      iconUrl:
        "https://img.icons8.com/material-outlined/24/multiple-inputs.png",
      handleInfo: [
        {
          id: "value",
          type: "source",
          position: "Right",
        },
      ],
    },
    {
      type: "customOutput",
      label: "Output",
      iconUrl: "https://img.icons8.com/material-outlined/24/output.png",
      handleInfo: [
        {
          id: "value",
          type: "target",
          position: "Left",
        },
      ],
    },
    {
      type: "text",
      label: "Text",
      iconUrl: "https://img.icons8.com/ios-glyphs/24/text.png",
      handleInfo: [
        {
          id: "text",
          type: "source",
          position: "Right",
        },
      ],
    },
    {
      type: "note",
      label: "Note",
      iconUrl: "https://img.icons8.com/ios-glyphs/24/note.png",
      handleInfo: [],
    },
  ],
  llm: [
    {
      type: "llm",
      label: "LLM",
      iconUrl: "https://img.icons8.com/ios/24/artificial-intelligence.png",
      handleInfo: [
        {
          id: "prompt",
          type: "source",
          position: "Right",
        },
        {
          id: "response",
          type: "target",
          position: "Left",
        },
      ],
    },
  ],
  vectorDB: [
    {
      type: "vector_store",
      label: "Vec Store",
      iconUrl: "https://img.icons8.com/ios-filled/24/vector.png",
      handleInfo: [
        {
          id: "value",
          type: "source",
          position: "Right",
        },
      ],
    },
  ],
};

export const NODETYPES = [
  {
    type: "general",
    label: "General",
    nodes: nodeCategories.general,
  },
  {
    type: "llm",
    label: "LLM",
    nodes: nodeCategories.llm,
  },
  {
    type: "vectorDB",
    label: "Vector DB",
    nodes: nodeCategories.vectorDB,
  },
];
