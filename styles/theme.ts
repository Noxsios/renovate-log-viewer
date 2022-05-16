import { MantineThemeOverride } from "@mantine/core";

let theme: MantineThemeOverride = {
  fontFamily: '"Montserrat", sans-serif',
  fontFamilyMonospace: '"Fira Code", monospace',
  fontSizes: {
    xs: 14,
    sm: 16,
    md: 18,
    lg: 20,
    xl: 22,
  },
  headings: {
    fontFamily: '"Recursive", "Segoe UI", "Helvetica Neue", Helvetica, Roboto, \'Open Sans\', FreeSans, sans-serif',
  },
  colorScheme: "dark",
  colors: {
    dark: ["#fafaf9", "#f5f5f4", "#e7e5e4", "#d6d3d1", "#a8a29e", "#78716c", "#57534e", "#44403c", "#292524", "#1c1917"],
  },
};

export default theme;
