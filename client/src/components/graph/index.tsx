/* eslint-disable */

import * as React from "react";
import cytoscape from "cytoscape";
import * as cytoscapeGraph from "./cytoscapeHelpers";
import { LessonConfigType } from "../../models/Wordhero";
import { toggleEdgeHandle } from "./cytoscapeHelpers";

const Graph: React.FunctionComponent<{
  elements: any;
  onTap: (x, y) => void;
  onUpdate: (data) => void;
  config: LessonConfigType;
  isEdit: boolean;
  disabled: boolean;
}> = ({ elements, onTap, onUpdate, config, isEdit, disabled = false }) => {
  const container = React.useRef<HTMLDivElement>(null);
  const graph = React.useRef<cytoscape.Core>();
  const layout = React.useRef<cytoscape.Layouts>();

  React.useEffect(() => {
    console.log(elements);

    if (graph.current && !!elements) {
      if (layout.current) {
        layout.current.stop();
      }
      graph.current.elements().remove();
      graph.current.add(elements);
    }
  }, [elements]);

  React.useEffect(() => {
    if (graph.current) {
      toggleEdgeHandle(isEdit);
    }
  }, [isEdit]);

  React.useEffect(() => {
    if (!container.current) {
      return;
    }
    try {
      if (!graph.current) {
        graph.current = cytoscapeGraph.createGraph(
          elements,
          container,
          isEdit,
          {
            complete: () => {
              setTimeout(() => {
                onUpdate(graph.current?.json());
              }, 100);
            },
          },
          disabled
        );

        // cytoscapeGraph.adjustStyles(graph, config);

        cytoscapeGraph.addHandlerForEdgeSelect(() =>
          onUpdate(graph.current?.json())
        );

        graph.current?.on("tap", (event) => {
          var evtTarget = event.target;
          if (evtTarget === graph.current) {
            const { renderedPosition, position } = event;
            onTap(renderedPosition, position);
          } else {
            console.log("tap on some element", evtTarget.classes());
          }
        });

        graph.current.on("dragfreeon", "node", () => {
          onUpdate(graph.current?.json());
        });
      }
    } catch (error) {
      console.error(error);
    }
    return () => {
      graph.current && graph.current.destroy();
    };
  }, []);

  return (
    <div
      className="graph full-height"
      ref={container}
      style={{ ...config.preferences }}
    />
  );
};

export default Graph;
