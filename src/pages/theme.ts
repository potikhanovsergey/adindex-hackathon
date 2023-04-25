import { ButtonStylesParams, MantineThemeOverride, rem } from "@mantine/core"

const colorOpacB14 = "rgba(0,0,0,.9)"
const colorOpacB7 = "rgba(0,0,0,.4)"
const colorOpacB8 = "rgba(0,0,0,.5)"
const colorOpacB9 = "rgba(0,0,0,.6)"

const theme: MantineThemeOverride = {
  black: "#000000",
  colorScheme: "dark",
  shadows: {
    xs: `0 1px 2px ${colorOpacB14},0 0px 2px ${colorOpacB14}`,
    sm: `0 4px 8px ${colorOpacB7},0 0px 4px ${colorOpacB7}`,
    md: `0 6px 16px ${colorOpacB8},0 0px 4px ${colorOpacB7}`,
    lg: `0 12px 32px ${colorOpacB8},0 0px 8px ${colorOpacB7}`,
    xl: `0 32px 64px ${colorOpacB9},0 0px 16px ${colorOpacB7}`,
  },
  primaryColor: "green",
  primaryShade: 5,
  cursorType: "pointer",
  other: {
    sizes: {
      icon: 20,
    },
  },
  colors: {
    dark: [
      "#c8c8d0",
      "#adadb8",
      "#848494",
      "#53535f",
      "#3b3b44",
      "#323239",
      "#26262c",
      "#1f1f23",
      "#18181b",
      "#0e0e10",
    ],
    gray: [
      "#f7f7f8",
      "#efeff1",
      "#e6e6ea",
      "#dedee3",
      "#d3d3d9",
      "#c8c8d0",
      "#adadb8",
      "#848494",
      "#53535f",
      "#3b3b44",
    ],
    green: [
      "#96f0c0",
      "#80ecb3",
      "#6be9a6",
      "#56e699",
      "#41e38d",
      "#2CE080",
      "#28ca73",
      "#1f9d5a",
      "#167040",
      "#0d4326",
    ],
  },
  globalStyles: (theme) => ({
    body: {
      background: theme.colors.dark[9],
      color: theme.colors.gray[1],
    },
  }),
  components: {
    Modal: {
      styles: (theme) => ({
        content: {
          border: "0 !important",
        },
      }),
    },

    Menu: {
      styles: (theme) => ({
        dropdown: {
          background: theme.colors.dark[7],
          boxShadow: theme.shadows.sm,
          border: 0,
        },
      }),
    },
    Popover: {
      styles: (theme) => ({
        dropdown: {
          background: theme.colors.dark[7],
          boxShadow: theme.shadows.sm,
          border: 0,
        },
      }),
    },
    Input: {
      defaultProps: {
        variant: "filled",
      },
    },
    PasswordInput: {
      defaultProps: {
        size: "xs",
      },
    },
    DateTimePicker: {
      defaultProps: {
        size: "xs",
      },
    },
    TextInput: {
      defaultProps: {
        size: "xs",
      },
    },
    Textarea: {
      defaultProps: {
        size: "xs",
      },
    },
    Select: {
      defaultProps: {
        size: "xs",
      },
    },
    Paper: {
      defaultProps: {
        withBorder: true,
      },
    },
    Tooltip: {
      defaultProps: {
        withArrow: true,
        radius: "sm",
      },
      styles: {
        tooltip: {
          padding: `${rem(2)} ${rem(8)}`,
          fontWeight: 600,
        },
      },
    },
    Button: {
      defaultProps: {
        size: "xs",
      },
      variants: {
        filled: (theme) => ({
          root: {
            color: theme.colors.dark[8],
          },
        }),
        light: (theme, params: ButtonStylesParams) => ({
          root: {
            backgroundColor: params.color === "gray" ? theme.colors.dark[5] : undefined,
            "&:not([data-disabled])": theme.fn.hover({
              backgroundColor: params.color === "gray" ? theme.colors.dark[4] : undefined,
            }),
          },
        }),
      },
    },
    Header: {
      styles: (theme) => ({
        root: {
          background: theme.colors.dark[8],
          borderBottom: 0,
          boxShadow: theme.shadows.xs,
          paddingLeft: theme.spacing.md,
          paddingRight: theme.spacing.md,
          zIndex: 101,
        },
      }),
    },
    Navbar: {
      styles: (theme) => ({
        root: {
          background: theme.colors.dark[7],
          borderRight: 0,
        },
      }),
    },
    Aside: {
      styles: (theme) => ({
        root: {
          background: theme.colors.dark[7],
          borderLeft: 0,
        },
      }),
    },
  },
}

export default theme
