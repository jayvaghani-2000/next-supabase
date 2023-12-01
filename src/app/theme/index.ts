import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export enum ThemeColor {
  CREAM = "#fcf8f3",
  BLACK = "#000000",
  WHITE = "#fff",
  LIGHT_GRAY = "#A6A6A6",
  GRAY = "#e2dfda",
  PRIME_GREEN = "#D8F055",
  PURPLE = "#8870FF",
  LIGHT_RED = "#F25B5C",
  LIGHT_ORANGE = "#FFB278",
  DARK_PINK = "#FC9985",
  LIGHT_GREEN = "#BDDEBC",
  GREEN = "#20BF55",
  MAROON = "#CF0000",
  DARK_YELLOW = "#FF9400",
  LIGHT_BLUE = "#A2CDFF",
}

const theme = createTheme({
  palette: {
    primary: {
      main: ThemeColor.BLACK,
    },
    common: {
      black: ThemeColor.BLACK,
      white: ThemeColor.WHITE,
    },
    text: {
      primary: ThemeColor.BLACK,
    },
    divider: "rgba(0,0,0,0.1)",

    background: {
      default: ThemeColor.WHITE,
    },
    error: {
      main: red.A700,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  zIndex: {
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h2",
          h2: "h2",
          h3: "h2",
          h4: "h2",
          h5: "h2",
          h6: "h2",
          subtitle1: "h1",
          subtitle2: "h2",
          body1: "p",
          body2: "p",
          button: "span",
        },
      },
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    h1: {
      fontWeight: "bold",
      fontSize: "3.5rem",
    },
    h2: {
      fontWeight: "bold",
      fontSize: "2rem",
    },
    h3: {
      fontWeight: "bold",
      fontSize: "1.5rem",
    },
    h6: {
      fontWeight: "bold",
      fontSize: "16px",
      lineHeight: "1.5",
      "@media (max-width:900px)": {
        fontSize: "14px",
      },
    },
    body2: {
      fontWeight: "bold",
      fontSize: "18px",
      lineHeight: "1.5",
      "@media (max-width:900px)": {
        fontSize: "16px",
      },
    },
    subtitle1: {
      fontWeight: "bold",
      lineHeight: "1.5",
      fontSize: "14px",
      "@media (max-width:900px)": {
        fontSize: "13px",
      },
    },
    subtitle2: {
      fontWeight: "bold",
      lineHeight: "1.5",
      fontSize: "16px",
      "@media (max-width:900px)": {
        fontSize: "12px",
      },
    },
    button: {
      fontWeight: "600",
      lineHeight: "1.5",
      fontSize: "14px",
      "@media (max-width:900px)": {
        fontSize: "10px",
      },
    },
  },
});

export default theme;
