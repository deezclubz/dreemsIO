import 'tldraw/tldraw.css'
import Tiptap from './components/tiptap'
import { Tildraw } from './components/tildraw'
import { useState } from 'react'

const App = () => {
	const [selectedLib, setSelectedLib] = useState<'tiptap' | 'tildraw' | null>(
		null
	)
	return (
		<>
			<h1 className="text-3xl font-bold underline">yo!</h1>
			{!selectedLib && (
				<div className="flex gap-4 mb-4">
					<button onClick={() => setSelectedLib('tildraw')}>
						Test Tildraw
					</button>
					<button onClick={() => setSelectedLib('tiptap')}>Test Tiptap</button>
				</div>
			)}

			{selectedLib === 'tildraw' && <Tildraw />}
			{selectedLib === 'tiptap' && <Tiptap />}

			{selectedLib && (
				<button onClick={() => setSelectedLib(null)} className="">
					← Назад
				</button>
			)}
		</>
	)
}

export default App
