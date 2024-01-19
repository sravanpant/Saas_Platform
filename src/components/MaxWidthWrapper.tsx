/**
 * The main use of this component is to create a max width wrapper across all the pages
 * in this project which will allow the content in the center of the page with appropriate padding
 * in the left and right side of the page.
 */

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const MaxWidthWrapper = ({
  className, // takes the className inputed in the component and adds it along the default className without overwriting it.
  children, // children here is all the tags encapsulated inside the MaxWidthWrapper when used as the component
}: {
  className?: string; // className will be optional here and this is due to `?` after the keyword className.
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-screen-xl px-2.5 md:px-20",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
