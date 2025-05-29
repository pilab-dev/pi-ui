import { FC, PropsWithChildren } from "react";

export type BoxProps = {
  spacing?: number;
  valign?: "bottom" | "center" | "top";
  align?: "left" | "center" | "right";
  flex?: boolean;
};

export const HBox: FC<PropsWithChildren<BoxProps>> = ({
  spacing = 0,
  children,
  valign = "top",
  // align = "left",
  flex = false,
}) => {
  // const getAlign = () => {
  //   switch (align) {
  //     case "center":
  //       return "center";
  //     case "left":
  //       return "flex-start";
  //     case "right":
  //       return "flex-end";
  //   }
  // };

  const getVAlign = () => {
    switch (valign) {
      case "center":
        return "center";
      case "top":
        return "flex-start";
      case "bottom":
        return "flex-end";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: getVAlign(),
        gap: spacing,
        flex: (flex && 1) || undefined,
      }}
    >
      {children}
    </div>
  );
};

export const VBox: FC<PropsWithChildren<BoxProps>> = ({
  spacing = 0,
  children,
  valign = "top",
  align = "left",
  flex = false,
}) => {
  const getAlign = () => {
    switch (align) {
      case "center":
        return "center";
      case "left":
        return "flex-start";
      case "right":
        return "flex-end";
    }
  };

  const getVAlign = () => {
    switch (valign) {
      case "center":
        return "center";
      case "top":
        return "flex-start";
      case "bottom":
        return "flex-end";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: getVAlign(),
        justifyContent: getAlign(),
        gap: spacing,
        flex: (flex && 1) || undefined,
      }}
    >
      {children}
    </div>
  );
};
