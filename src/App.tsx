import 'tldraw/tldraw.css'
import Tiptap from './components/tiptap'
import { Tildraw } from './components/tildraw'
import { useState } from 'react'
import {
	AssetRecordType,
	getHashForString,
	JsonObject,
	TLAsset,
	TLAssetStore,
	TLBookmarkAsset,
	uniqueId,
} from 'tldraw'
import { useSync } from '@tldraw/sync'

const WORKER_URL = `http://localhost:5858`

const roomId = 'test-room'
const App = () => {
	const [selectedLib, setSelectedLib] = useState<'tiptap' | 'tildraw' | null>(
		null
	)

	const store = useSync({
		// We need to know the websocket's URI...
		uri: `${WORKER_URL}/connect/${roomId}`,
		// ...and how to handle static assets like images & videos
		assets: multiplayerAssets,
	})

	return (
		<>
			<h1 className="text-3xl font-bold underline">yo!</h1>
			{!selectedLib && (
				<div className="flex gap-4 mb-4">
					<button onClick={() => setSelectedLib('tildraw')}>Test Tldraw</button>
					<button onClick={() => setSelectedLib('tiptap')}>Test Tiptap</button>
				</div>
			)}

			{selectedLib === 'tildraw' && <Tildraw store={store} unfurlBookmarkUrl={unfurlBookmarkUrl} />}
			{selectedLib === 'tiptap' && <Tiptap />}

			{selectedLib && (
				<button onClick={() => setSelectedLib(null)} className="">
					← Назад
				</button>
			)}
		</>
	)
}

const multiplayerAssets: TLAssetStore = {
	// to upload an asset, we prefix it with a unique id, POST it to our worker, and return the URL
	async upload(_asset: TLAsset, file: File): Promise<{ src: string; meta?: JsonObject }> {
		const id = uniqueId();
		const objectName = `${id}-${file.name}`;
		const url = `${WORKER_URL}/uploads/${encodeURIComponent(objectName)}`;
	
		const response = await fetch(url, {
		  method: 'PUT',
		  body: file,
		});
	
		if (!response.ok) {
		  throw new Error(`Failed to upload asset: ${response.statusText}`);
		}
	
		return {
		  src: url,
		  // meta можно добавить при необходимости
		  // meta: { size: file.size, type: file.type }
		};
	},
	// to retrieve an asset, we can just use the same URL. you could customize this to add extra
	// auth, or to serve optimized versions / sizes of the asset.
	resolve(asset: TLAsset): string {
		if (!asset.props?.src) {
		  throw new Error('Asset source is missing');
		}
		return asset.props.src;
	  }
}

async function unfurlBookmarkUrl({ url }: { url: string }): Promise<TLBookmarkAsset> {
	const asset: TLBookmarkAsset = {
		id: AssetRecordType.createId(getHashForString(url)),
		typeName: 'asset',
		type: 'bookmark',
		meta: {},
		props: {
			src: url,
			description: '',
			image: '',
			favicon: '',
			title: '',
		},
	}

	try {
		const response = await fetch(`${WORKER_URL}/unfurl?url=${encodeURIComponent(url)}`)
		const data = await response.json()

		asset.props.description = data?.description ?? ''
		asset.props.image = data?.image ?? ''
		asset.props.favicon = data?.favicon ?? ''
		asset.props.title = data?.title ?? ''
	} catch (e) {
		console.error(e)
	}

	return asset
}

export default App
