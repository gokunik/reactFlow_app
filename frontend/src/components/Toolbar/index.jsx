// toolbar.js

import { DraggableNode } from "../CreateNode/DraggableNode";

import { NODETYPES } from "../../consts";
import { useState } from "react";

export const PipelineToolbar = () => {
  const [activeTab, setActiveTab] = useState("general");
  return (
    <div className="py-2.5 px-8 border-b">
      <div className="mt-2.5 ">
        <div className="container flex flex-wrap gap-8">
          {NODETYPES.map((category) => {
            return (
              <button
                key={category.type}
                className={`capitalize ${
                  activeTab === category.type
                    ? "font-bold border-b-2 border-b-violet-600"
                    : "tablinks"
                }
                    `}
                onClick={() => setActiveTab(category.type)}
              >
                {category.label}
              </button>
            );
          })}
        </div>
        <div className="container flex flex-wrap gap-4 mt-4">
          {NODETYPES.map((category) => {
            if (activeTab === category.type) {
              return category.nodes.map((node) => {
                return <DraggableNode key={node.type} nodeData={node} />;
              });
            }
          })}
        </div>
      </div>
    </div>
  );
};
