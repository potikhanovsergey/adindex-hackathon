import { PropsOf } from "@emotion/react"
import {
  Anchor,
  AnchorProps,
  MantineColor,
  createStyles,
  rem,
  useMantineTheme,
} from "@mantine/core"
import { IconExternalLink } from "@tabler/icons-react"
import NextLink from "next/link"

const useStyles = createStyles(
  (theme, { color = theme.primaryColor }: { color?: MantineColor }) => ({
    root: {
      display: "inline-flex",
      alignItems: "center",
      textDecoration: "none",
      color: theme.colors[color][5],
      "&:hover, &[data-active]": {
        textDecoration: "none",
        backgroundImage: `linear-gradient(${theme.colors[color][5]}, ${theme.colors[color][5]})`,
        backgroundSize: "100% 1px",
        backgroundPosition: "0 100%",
        backgroundRepeat: "no-repeat",
      },
    },
    icon: {
      marginLeft: rem(4),
    },
  })
)

const Link = ({
  className,
  active,
  ...props
}: AnchorProps & {
  href: PropsOf<typeof NextLink>["href"]
  target?: PropsOf<typeof NextLink>["target"]
  active?: boolean
}) => {
  const theme = useMantineTheme()
  const { classes, cx } = useStyles({ color: props.color })
  return (
    <Anchor
      {...(active ? { "data-active": true } : {})}
      component={NextLink}
      className={cx(classes.root, className)}
      {...props}
      onClick={(e) => e.stopPropagation()}
    >
      {props.children}
      {props.target === "_blank" && (
        <IconExternalLink
          color={theme.colors[props.color || theme.primaryColor][5]}
          className={classes.icon}
          size={theme.fontSizes[props.size || "sm"]}
        />
      )}
    </Anchor>
  )
}

export default Link
