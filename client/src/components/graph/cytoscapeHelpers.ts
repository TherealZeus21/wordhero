import cytoscape from "cytoscape";
import edgehandles from "cytoscape-edgehandles";
import cxtmenu from "cytoscape-cxtmenu";
import popper from "cytoscape-popper";
import { edgeHandlesDefaults } from "./edgehandlesDefaults";
import { makePopper } from "./popper";
import style from "./style";
import { ctDefaults } from "./settings/ctDefaults";

cytoscape.use(edgehandles);
cytoscape.use(popper);
cytoscape.use(cxtmenu);
// eslint-disable-next-line no-underscore-dangle
let _graph = {} as cytoscape.Core;
let _eh = null as any;
let _ctMenu = null;
let _options;
let _popperInstance;

export function createGraph(
  elements: any,
  container,
  isEdit,
  options,
  autolock = false
): cytoscape.Core {
  _options = options;
  _graph = cytoscape({
    elements,
    style,
    maxZoom: 2,
    minZoom: 0.5,
    wheelSensitivity: 0.2,
    container: container.current,
    layout: {
      name:
        Array.isArray(elements.nodes) &&
        elements.nodes.every((x) => !x.position)
          ? "grid"
          : "preset",
    },
    autolock,
  });

  if (isEdit) {
    createEdgeHandler();
    createContextMenu();
  }

  return _graph;
}

function createContextMenu() {
  _ctMenu = (_graph as any).cxtmenu(ctDefaults);
}

function createEdgeHandler() {
  _eh = (_graph as any).edgehandles({ ...edgeHandlesDefaults, ..._options });
}

export function toggleEdgeHandle(show: boolean) {
  if (show) {
    createEdgeHandler();
  } else {
    if (_eh) {
      _eh.hide();
      _eh.destroy();
      _eh = null;
    }
  }
}

function hideEdgeHandleElement() {
  if (_eh) {
    _eh.hide();
  }
}

export function addHandlerForEdgeSelect(saveChanges: () => void): void {
  const updatePopper = (): void => {
    _popperInstance.scheduleUpdate();
  };

  _graph.on("select", "edge", (event) => {
    _graph.elements(event.target).forEach((ele) => {
      if (!_eh) {
        return;
      }
      _popperInstance = makePopper(ele, () => {
        hideEdgeHandleElement();
        ele.remove();
        saveChanges();
        _popperInstance.destroy();
        _graph.removeListener("position");
      });
      _graph.addListener("pan zoom resize", updatePopper);
      _graph.addListener("position", () => {
        ele.unselect();
        removePopper();
      });
    });
  });

  _graph.on("unselect", "edge", () => {
    removePopper();
  });

  _graph.on("select", ".group-element", (event) => {
    _graph.elements(event.target).forEach((ele) => {
      if (!_eh) {
        return;
      }
      _popperInstance = makePopper(ele, () => {
        hideEdgeHandleElement();
        ele.remove();
        saveChanges();
        _popperInstance.destroy();
      });
      _graph.addListener("pan zoom resize", updatePopper);
      ele.addListener("position", () => {
        ele.unselect();
        removePopper();
        ele.removeListener("position");
      });
    });
  });

  _graph.on("unselect", ".group-element", () => {
    removePopper();
  });
}

export function removePopper() {
  if (!_popperInstance) {
    return;
  }
  try {
    _popperInstance.destroy();
  } catch {}
  _graph.removeListener("pan zoom resize");
  _popperInstance = null;
}

export function adjustStyles(graph, config): void {
  if (graph.current && config.preferences) {
    const nodeStyle: any = style.find((x) => x.selector === "node");
    const font = config.preferences.font || "arial";
    nodeStyle.style["font-family"] = font;
    graph.current.style(style);
  }
}
