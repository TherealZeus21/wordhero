export const ctDefaults = {
  menuRadius: 100, // the radius of the circular menu in pixels
  selector: "node.item", // elements matching this Cytoscape.js selector will trigger cxtmenus
  commands: [
    {
      content: `<div class="circle red"></div>`,
      select: function(node) {
        removeOldColor(node);
        node.addClass("bg-red");
      },
    },
    {
      content: `<div class="circle blue"></div>`,
      select: function(node) {
        removeOldColor(node);
        node.addClass("bg-blue");
      },
    },
    {
      content: `<div class="circle yellow"></div>`,
      select: function(node) {
        removeOldColor(node);
        node.addClass("bg-yellow");
      },
    },
    {
      content: `<div class="circle green"></div>`,
      select: function(node) {
        removeOldColor(node);
        node.addClass("bg-green");
      },
    },
    {
      content: `<div class="circle white"></div>`,
      select: function(node) {
        removeOldColor(node);
        node.addClass("bg-white");
      },
    },
  ], // function( ele ){ return [ /*...*/ ] }, // a function that returns commands or a promise of commands
  fillColor: "rgba(255, 255, 255, 0.9)", // the background colour of the menu
  activeFillColor: "rgba(1, 105, 217, 0.75)", // the colour used to indicate the selected command
  activePadding: 20, // additional size in pixels for the active command
  indicatorSize: 24, // the size in pixels of the pointer to the active command
  separatorWidth: 3, // the empty spacing in pixels between successive commands
  spotlightPadding: 4, // extra spacing in pixels between the element and the spotlight
  minSpotlightRadius: 24, // the minimum radius in pixels of the spotlight
  maxSpotlightRadius: 38, // the maximum radius in pixels of the spotlight
  openMenuEvents: "cxttapstart taphold", // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
  itemColor: "white", // the colour of text in the command's content
  itemTextShadowColor: "transparent", // the text shadow colour of the command's content
  zIndex: 9999, // the z-index of the ui div
  atMouse: false, // draw menu at mouse position
};

const allColors = ["bg-red", "bg-blue", "bg-yellow", "bg-green", "bg-white"];
function removeOldColor(node) {
  allColors.forEach((className) => {
    node.removeClass(className);
  });
}
