import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AccordionHeader = ({ children }: Props) => {
  return <>{children}</>;
};

export default AccordionHeader;
