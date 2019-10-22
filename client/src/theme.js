const theme = {
  breakpoints: {
    mobile: "414px",
    tabletPortrait: "768px",
    tabletLandscape: "1024px",
    desktop: "1280px",
    desktopLarge: "1440px"
  },
  palette: {
    text: "#44404B",
    lightText: "white",
    main: "#FF7855",
    mainLight: "#FFF2EF",
    secondary: "#56D7E8",
    background: "#F9FAFC",
    highlight: "#F6F9FF",

    error: "#FE3862",
    disabled: "#ddd",

    border: "#D3D0DD",
    sidebar: "#FDFDFE",
    foreground: "#FDFDFE"
  },
  mixins: {
    hoverFade: "transition: ease-in 0.1s",
  },
  size: {
    sidebar: 250 /*px */,
    gutterWidth: "16px"
  },
};

export { theme };
