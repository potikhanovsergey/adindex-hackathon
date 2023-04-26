import { RichTextEditor, Link } from "@mantine/tiptap"
import { Editor, useEditor } from "@tiptap/react"
import Highlight from "@tiptap/extension-highlight"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import { FC } from "react"
import { Tooltip } from "@mantine/core"

const content =
  '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>'

export interface RichTextareaProps {
  editor: Editor | null
}

export const RichTextareaExtensions = [
  StarterKit,
  Underline,
  Link,
  Highlight,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
]

const RichTextarea: FC<RichTextareaProps> = ({ editor }) => {
  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup>
          <Tooltip label="Жирный">
            <RichTextEditor.Bold />
          </Tooltip>
          <Tooltip label="Курсив">
            <RichTextEditor.Italic />
          </Tooltip>
          <Tooltip label="Подчёкрнутый">
            <RichTextEditor.Underline />
          </Tooltip>
          <Tooltip label="Зачеркнутый">
            <RichTextEditor.Strikethrough />
          </Tooltip>
          <Tooltip label="Очистить форматирование">
            <RichTextEditor.ClearFormatting />
          </Tooltip>
          <Tooltip label="Выделить цветом">
            <RichTextEditor.Highlight />
          </Tooltip>
          <Tooltip label="Код">
            <RichTextEditor.Code />
          </Tooltip>
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <Tooltip label="Заголовок 1">
            <RichTextEditor.H1 />
          </Tooltip>
          <Tooltip label="Заголовок 2">
            <RichTextEditor.H2 />
          </Tooltip>
          <Tooltip label="Заголовок 3">
            <RichTextEditor.H3 />
          </Tooltip>
          <Tooltip label="Заголовок 4">
            <RichTextEditor.H4 />
          </Tooltip>
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <Tooltip label="Цитата">
            <RichTextEditor.Blockquote />
          </Tooltip>
          <Tooltip label="Разделитель">
            <RichTextEditor.Hr />
          </Tooltip>
          <Tooltip label="Маркеры">
            <RichTextEditor.BulletList />
          </Tooltip>
          <Tooltip label="Нумерация">
            <RichTextEditor.OrderedList />
          </Tooltip>
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <Tooltip label="Добавить ссылку">
            <RichTextEditor.Link />
          </Tooltip>
          <Tooltip label="Удалить ссылку">
            <RichTextEditor.Unlink />
          </Tooltip>
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <Tooltip label="Выровнять по левому краю">
            <RichTextEditor.AlignLeft />
          </Tooltip>
          <Tooltip label="Выровнять по центру">
            <RichTextEditor.AlignCenter />
          </Tooltip>
          <Tooltip label="Выровнять по ширине">
            <RichTextEditor.AlignJustify />
          </Tooltip>
          <Tooltip label="Выровнять по правому краю">
            <RichTextEditor.AlignRight />
          </Tooltip>
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  )
}

export default RichTextarea
