import './App.css'
import { Tldraw } from 'tldraw'
import { useSyncDemo } from '@tldraw/sync'
import 'tldraw/tldraw.css'

const App = () => {
	const store = useSyncDemo({ roomId: 'myapp-abc123' })
	return (
		<>
			<h1>yo!</h1>
			<div style={{ position: 'fixed', inset: 0 }}>
				<Tldraw store={store} />
			</div>
		</>
	)
}

export default App
