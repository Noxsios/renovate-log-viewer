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
    dark: ["#c2870a", "#a39e98", "#8c8fa3", "#666980", "#4d4f66", "#34354a", "#1e1e1e", "#27282d", "#01010a", "#01010a"],
  },
};

export default theme;
