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
    mainDark: "#FF5C14",

    error: "#F73953",
    border: "#ddd"
  },
  mixins: {
    hoverFade: "transition: ease-in 0.2s"
  }
}

export { theme };