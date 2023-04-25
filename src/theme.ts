import {
  MantineThemeOverride,
  rem,
  getStylesRef,
  ButtonStylesParams,
  ActionIconStylesParams,
} from "@mantine/core"
import { Rubik } from "next/font/google"

const font = Rubik({
  variable: "--bubble-font",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  preload: false,
})

const defaultFonts = `-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji`

const BubbleTheme: MantineThemeOverride = {
  cursorType: "pointer",
  defaultRadius: "sm",
  primaryShade: 5,
  primaryColor: "yellow",
  fontFamily: `var(--bubble-font), ${defaultFonts}`,
  headings: {
    fontFamily: `var(--bubble-font), ${defaultFonts}`,
  },
  other: {
    transition: ".15s ease",
  },
  components: {
    Button: {
      defaultProps: () => ({
        loaderPosition: "center",
        size: "xs",
      }),
      variants: {
        filled: (theme, params: ButtonStylesParams) => ({
          root: {
            background: theme.black,
            color: theme.white,
            "&:not([data-disabled])": theme.fn.hover({
              background: theme.colors.dark[5],
            }),
          },
        }),
        outline: (theme, params: ButtonStylesParams) => ({
          root: {
            backgroundColor: theme.white,
            color: theme.black,
            border: "2px solid",
            borderColor: theme.black,
            "&:not([data-disabled])": theme.fn.hover({
              background: theme.colors[params.color || theme.primaryColor][3],
            }),
          },
        }),
        subtle: (theme, params: ButtonStylesParams, { variant }) => ({
          root: {
            backgroundColor: theme.white,
            color: theme.black,
            "&:not([data-disabled])": theme.fn.hover({
              background: theme.colors[params.color || theme.primaryColor][3],
            }),
          },
        }),
      },
      styles: (theme, params: ButtonStylesParams, { variant }) => ({
        root: {
          transition: `all ${theme.other.transition}`,
          "&[data-loading]": {
            color: "transparent",
            svg: {
              stroke:
                variant === "transparent" || variant === "secondary"
                  ? theme.colors[params.color || theme.primaryColor][5]
                  : theme.white,
            },
            "&:before": {
              display: "none",
            },
            ".mantine-Button-centerLoader": {
              opacity: 1,
            },
            [`& .${getStylesRef("rightIcon")}, .${getStylesRef("leftIcon")}`]: {
              opacity: 0,
            },
          },
        },
      }),
    },
    ActionIcon: {
      defaultProps: (theme) => ({
        color: theme.primaryColor,
      }),
      variants: {
        filled: (theme, params: ButtonStylesParams) => ({
          root: {
            background: theme.black,
            color: theme.white,
            "&:not([data-disabled])": theme.fn.hover({
              background: theme.colors.dark[5],
            }),
          },
        }),
        outline: (theme, params: ButtonStylesParams) => ({
          root: {
            backgroundColor: theme.white,
            color: theme.black,
            border: "2px solid",
            borderColor: theme.black,
            "&:not([data-disabled])": theme.fn.hover({
              background: theme.colors[params.color || theme.primaryColor][3],
            }),
          },
        }),
        subtle: (theme, params: ButtonStylesParams, { variant }) => ({
          root: {
            backgroundColor: theme.white,
            color: theme.black,
            "&:not([data-disabled])": theme.fn.hover({
              background: theme.colors[params.color || theme.primaryColor][3],
            }),
          },
        }),
      },
      styles: (theme, params: ActionIconStylesParams, { variant }) => ({
        root: {
          transition: `all ${theme.other.transition}`,
          "&[data-loading]": {
            color: "transparent",
            svg: {
              "&[data-action-icon-loader]": {
                maxWidth: "60%",
                stroke:
                  variant === "transparent" || variant === "secondary"
                    ? theme.colors[params.color || theme.primaryColor][5]
                    : theme.white,
              },
            },
            "&:before": {
              display: "none",
            },
            ".mantine-Button-centerLoader": {
              opacity: 1,
            },
            [`& .${getStylesRef("rightIcon")}, .${getStylesRef("leftIcon")}`]: {
              opacity: 0,
            },
          },
        },
      }),
    },
    Paper: {
      defaultProps: {
        p: "lg",
        withBorder: true,
        shadow: "none",
      },
      styles: (theme) => ({
        root: {
          border: `2px solid ${theme.black} !important`,
        },
      }),
    },
    Select: {
      defaultProps: {
        size: "xs",
      },
      styles: () => ({
        item: {
          "&:not(:last-child)": {
            marginBottom: rem(4),
          },
        },
      }),
    },
    Popover: {
      defaultProps: {
        shadow: "md",
      },
      styles: {
        dropdown: {
          border: "none",
        },
      },
    },
    HoverCard: {
      styles: (theme) => ({
        dropdown: {
          borderColor: theme.black,
        },
      }),
    },
    ScrollArea: {
      defaultProps: {
        type: "never",
      },
      styles: {
        scrollbar: {
          zIndex: 101,
        },
      },
    },
    Navbar: {
      styles: {
        root: {
          // border: 0,
        },
      },
    },
    Header: {
      styles: (theme) => ({
        root: {
          // borderBottom: 0,
          background: theme.fn.rgba(theme.white, 0.7),
          backdropFilter: "blur(12px)",
        },
      }),
    },
    Input: {
      styles: (theme) => ({
        input: {
          border: "2px solid",
          borderColor: theme.black,
          "&:focus": {
            borderColor: theme.colors[theme.primaryColor][3],
          },
        },
      }),
    },
    Container: {
      defaultProps: {
        size: "xl",
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
    NumberInput: {
      defaultProps: {
        size: "xs",
      },
    },
    Textarea: {
      defaultProps: {
        size: "xs",
      },
    },
  },

  globalStyles: (theme) => ({
    "::selection": {
      background: theme.colors[theme.primaryColor][3],
    },
    body: {
      WebkitFontSmoothing: "antialiased",
    },
  }),
}

export default BubbleTheme
