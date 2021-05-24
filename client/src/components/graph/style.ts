import { Stylesheet } from "cytoscape";

const nodeStyles: Stylesheet[] = [
  {
    selector: "node",
    style: {
      "font-size": "23",
      "text-valign": "center",
      "text-halign": "center",
      label: "data(label)",
      "background-opacity": 0.9,
      backgroundColor: "white",
      shape: "round-rectangle",
      height: "30px",
      color: "#4f34c7",
      width: "label",
      "padding-right": "10",
    },
  },

  {
    selector: ".group-element",
    style: {
      "font-size": "32",
      "font-weight": "bold",
      "background-color": "#ffffff",
      "background-opacity": 1,
      "border-style": "solid",
      "border-width": "1px",
      "border-color": "#4f34c7",
      shape: "round-rectangle",
      height: "100px",
      color: "#4f34c7",
      width: "label",
    },
  },
];
const edgeStyles: Stylesheet[] = [
  {
    selector: "edge",
    style: {
      "curve-style": "bezier",
      "target-arrow-shape": "triangle",
      "text-valign": "center",
      "text-halign": "center",
      "padding-right": "2",
    },
  },
];

const edgeHandlesStyle: Stylesheet[] = [
  {
    selector: ".eh-handle",
    style: {
      "background-color": "#ffc107",
      width: 22,
      height: 22,
      shape: "ellipse",
      "overlay-opacity": 0,
      "border-width": 10, // makes the handle easier to hit
      "border-opacity": 0,
      label: "+",
      "background-opacity": 1,
      "padding-right": "2",
    },
  },

  {
    selector: ".eh-hover",
    style: {
      "background-color": "#ffc107",
    },
  },

  {
    selector: ".eh-source",
    style: {
      "border-width": 2,
      "border-color": "#ffc107",
    },
  },

  {
    selector: ".eh-target",
    style: {
      "border-width": 2,
      "border-color": "#ffc107",
    },
  },

  {
    selector: ".eh-preview, .eh-ghost-edge",
    style: {
      "background-color": "#ffc107",
      "line-color": "#ffc107",
      "target-arrow-color": "#ffc107",
      "source-arrow-color": "#ffc107",
    },
  },

  {
    selector: ".eh-ghost-edge.eh-preview-active",
    style: {
      opacity: 0,
    },
  },

  {
    selector: "node.bg-red",
    style: {
      backgroundColor: "red",
      color: "white",
    },
  },
  {
    selector: "node.bg-blue",
    style: {
      backgroundColor: "blue",
      color: "white",
    },
  },
  {
    selector: "node.bg-yellow",
    style: {
      backgroundColor: "yellow",
    },
  },
  {
    selector: "node.bg-green",
    style: {
      backgroundColor: "green",
      color: "white",
    },
  },
  {
    selector: "node.bg-white",
    style: {
      backgroundColor: "white",
    },
  },
];

export default [...nodeStyles, ...edgeStyles, ...edgeHandlesStyle];
