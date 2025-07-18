import { RemoteTLStoreWithStatus, useSyncDemo } from '@tldraw/sync'
import {
	DefaultKeyboardShortcutsDialog,
	DefaultKeyboardShortcutsDialogContent,
	DefaultToolbar,
	DefaultToolbarContent,
	TLComponents,
	Tldraw,
	TldrawUiMenuItem,
	TLTextShape,
	TLUiAssetUrlOverrides,
	TLUiOverrides,
	toRichText,
	useIsToolSelected,
	useTools,
	TLBookmarkAsset
} from 'tldraw'
import { StickerTool } from './tldrawTools/test-tool'

const customTools = [StickerTool]

const uiOverrides: TLUiOverrides = {
	tools(editor, tools) {
		tools.sticker = {
			id: 'sticker',
			icon: 'heart-icon',
			label: 'Sticker',
			kbd: 's',
			onSelect: () => {
				editor.setCurrentTool('sticker')
			},
		}
		return tools
	},
}

const components: TLComponents = {
	Toolbar: (props) => {
		const tools = useTools()
		const isStickerSelected = useIsToolSelected(tools['sticker'])

		return (
			<DefaultToolbar {...props}>
				<TldrawUiMenuItem
					{...tools['sticker']}
					isSelected={isStickerSelected}
				/>
				<DefaultToolbarContent />
			</DefaultToolbar>
		)
	},
	KeyboardShortcutsDialog: (props) => {
		const tools = useTools()
		return (
			<DefaultKeyboardShortcutsDialog {...props}>
				<DefaultKeyboardShortcutsDialogContent />
				<TldrawUiMenuItem {...tools['sticker']} />
			</DefaultKeyboardShortcutsDialog>
		)
	},
}

const assetUrls: TLUiAssetUrlOverrides = {
	icons: {
		'heart-icon': './public/heart.svg',
	},
}


interface TildrawProps {
	store: RemoteTLStoreWithStatus
	unfurlBookmarkUrl: (args: { url: string }) => Promise<TLBookmarkAsset>
}
export const Tildraw:React.FC<TildrawProps> = (props) => {
	const { 
		// store,
		unfurlBookmarkUrl 
	} = props


	const store = useSyncDemo({ roomId: 'dreemsIO' })

	return (
		<div className="tldraw__editor" style={{ height: '100vh' }}>
			<div
				style={{ position: 'fixed', inset: 0, width: '50vw', height: '50vh' }}
			>
				<Tldraw
					store={store}
					tools={customTools}
					components={components}
					assetUrls={assetUrls}
					overrides={uiOverrides}
					initialState="select"
					onMount={(editor) => {
             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-expect-error
						window.editor = editor
						// when the editor is ready, we need to register out bookmark unfurling service
						editor.registerExternalAssetHandler('url', unfurlBookmarkUrl)
						editor.createShape<TLTextShape>({
							type: 'text',
							x: 100,
							y: 100,
							props: {
								richText: toRichText('Click anywhere to add a sticker'),
							},
						})
					}}
				/>
			</div>
		</div>
	)
}
