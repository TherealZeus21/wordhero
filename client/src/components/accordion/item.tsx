import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AccordionItem = ({ children }: Props) => {
  return (
    <li>
      <div className="item">{children}</div>
    </li>
  );
};

export default AccordionItem;
