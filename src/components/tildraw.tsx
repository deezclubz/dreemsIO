import { useSyncDemo } from '@tldraw/sync'
import { Tldraw } from 'tldraw'

export const Tildraw = () => {
	const store = useSyncDemo({ roomId: 'dreemsIO' })
	return (
		<div>
			<div style={{ position: 'fixed', inset: 0 }}>
				<Tldraw store={store} />
			</div>
		</div>
	)
}
