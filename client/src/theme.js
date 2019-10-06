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
    main: "#FF7F5F",
    mainLight: "#FFF2EF",
    secondary: "#FFA217",
    background: "#F9FAFC",
    highlight: "#F6F9FF",

    error: "#F73953",
    disabled: "#ddd",

    border: "#D3D0DD",
    sidebar: "#F9F9FB",
    foreground: "#FCFDFE"
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
