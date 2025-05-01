import { RemoteTLStoreWithStatus } from '@tldraw/sync'
import { TLBookmarkAsset, Tldraw } from 'tldraw'

interface TildrawProps {
	store: RemoteTLStoreWithStatus
	unfurlBookmarkUrl: (args: { url: string }) => Promise<TLBookmarkAsset>
}
export const Tildraw:React.FC<TildrawProps> = (props) => {
	const { store,unfurlBookmarkUrl } = props
	return (
		<div>
			<div
				style={{ position: 'fixed', inset: 0, width: '50vw', height: '50vh' }}
			>
				<Tldraw 
					store={store} 
					onMount={(editor) => {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-expect-error
						window.editor = editor
						// when the editor is ready, we need to register out bookmark unfurling service
						editor.registerExternalAssetHandler('url', unfurlBookmarkUrl)
				}}/>
			</div>
		</div>
	)
}
