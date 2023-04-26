import {
  MantineThemeOverride,
  rem,
  getStylesRef,
  ButtonStylesParams,
  ActionIconStylesParams,
} from "@mantine/core"
import { Rubik } from "next/font/google"

export const font = Rubik({
  variable: "--rubik-font",
  weight: ["400", "500", "600", "700"],
  subsets: ["cyrillic", "latin"],
  preload: true,
})

const defaultFonts = `-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji`

const BubbleTheme: MantineThemeOverride = {
  cursorType: "pointer",
  defaultRadius: "sm",
  primaryShade: 5,
  primaryColor: "yellow",
  fontFamily: `var(--rubik-font), ${defaultFonts}`,
  headings: {
    fontFamily: `var(--rubik-font), ${defaultFonts}`,
  },
  other: {
    transition: ".15s ease",
  },
  components: {
    AppShell: {
      styles: (theme) => ({
        main: {
          minHeight: "100vh",
          paddingTop: "calc(var(--mantine-header-height) + 16px)",
        },
      }),
    },
    Tooltip: {
      defaultProps: {
        withArrow: true,
      },
    },
    Avatar: {
      variants: {
        outline: (theme) => ({
          placeholder: {
            borderWidth: rem(2),
          },
        }),
      },
    },
    Notification: {
      defaultProps: {
        withBorder: true,
      },
      styles: (theme) => ({
        root: {
          paddingLeft: theme.spacing.xl,
          "&[data-with-border]": {
            border: `${rem(2)} solid ${theme.black}`,
          },
        },
      }),
    },
    Divider: {
      defaultProps: {
        size: "sm",
      },
    },
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
      styles: (theme) => ({
        root: {
          borderRight: `${rem(2)} solid ${theme.black}`,
        },
      }),
    },
    NavLink: {
      defaultProps: (theme) => ({
        variant: "subtle",
      }),
    },
    Header: {
      styles: (theme) => ({
        root: {
          borderBottom: `${rem(2)} solid ${theme.black}`,
          background: theme.fn.rgba(theme.white, 0.7),
          backdropFilter: "blur(12px)",
        },
      }),
    },
    Menu: {
      styles: (theme) => ({
        dropdown: {
          border: `${rem(2)} solid ${theme.black}`,
        },
        divider: {
          borderTop: `${rem(2)} solid ${theme.black}`,
        },
      }),
    },
    RichTextEditor: {
      styles: (theme) => ({
        root: {
          border: `${rem(2)} solid ${theme.black}`,
        },
        toolbar: {
          borderBottom: `${rem(2)} solid ${theme.black}`,
          top: "var(--mantine-header-height)",
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
