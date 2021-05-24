export function makePopper(ele, cb) {
  return ele.popper({
    content: () => {
      const div = document.createElement("div");
      div.classList.add("circle-sign");
      div.classList.add("remove-sign");
      div.onclick = cb;
      document.body.appendChild(div);

      return div;
    },
    popper: {
      removeOnDestroy: true,
    }, // my popper options here
  });
}
