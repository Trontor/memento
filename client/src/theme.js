const theme = {
  breakpoints: {
    mobile: "414px",
    tabletPortrait: "768px",
    tabletLanscape: "1024px",
    desktop: "1280px"
  },
  palette: {
    text: "#44404B",
    main: "#FF844D",
    secondary: "#FFA217",

    error: "#F73953",
    border: "#D3D0DD"
  },
  mixins: {
    hoverFade: "transition: ease-in 0.1s"
  }
}

export { theme };