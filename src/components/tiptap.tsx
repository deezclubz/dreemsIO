import { FC } from 'react'

import { FloatingMenu, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { MenuBar } from './tiptap-menubar'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'

const Tiptap: FC = () => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			TextAlign.configure({
				types: ['heading', 'paragraph'],
			}),
		],
		content: '<blockquote>Hello World!</blockquote>',
	})
	return (
		<div className="border p-4 rounded-md">
			{editor && (
				<>
					<FloatingMenu editor={editor}>
						<button>Меню</button>
					</FloatingMenu>
				</>
			)}
			<MenuBar editor={editor} />
			<EditorContent editor={editor} className="min-h-[150px] outline-none" />
		</div>
	)
}

export default Tiptap
