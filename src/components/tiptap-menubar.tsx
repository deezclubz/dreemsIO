import { Editor } from '@tiptap/react'
import { FC } from 'react'

type MenuBarProps = {
	editor: Editor | null
}
export const MenuBar: FC<MenuBarProps> = ({ editor }) => {
	if (!editor) return null

	return (
		<div className="flex gap-2 mb-2 pb-2">
			<button
				onClick={() => editor.chain().focus().toggleBold().run()}
				className={editor.isActive('bold') ? 'font-bold' : ''}
			>
				Bold
			</button>
			<button
				onClick={() => editor.chain().focus().toggleItalic().run()}
				className={editor.isActive('italic') ? 'italic' : ''}
			>
				Italic
			</button>
			<button
				onClick={() => editor.chain().focus().toggleStrike().run()}
				className={editor.isActive('srike') ? 'line-through' : ''}
			>
				Strike
			</button>
			<button
				onClick={() => editor.chain().focus().setTextAlign('center').run()}
				className={editor.isActive('srike') ? 'line-through' : ''}
			>
				Align
			</button>
		</div>
	)
}
