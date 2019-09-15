const theme = {
  breakpoints: {
    mobile: "414px",
    tabletPortrait: "768px",
    tabletLandscape: "1024px",
    desktop: "1280px"
  },
  palette: {
    text: "#44404B",
    main: "#FF7F5F",
    secondary: "#FFA217",
    background: "#FAFBFD",
    highlight: "#F6F9FF",

    error: "#F73953",
    disabled: "#ddd",

    border: "#D3D0DD",
    sidebar: "#F7FAFE",
  },
  mixins: {
    hoverFade: "transition: ease-in 0.1s"
  },
  size: {
    sidebar: "280px"
  }
};

export { theme };
