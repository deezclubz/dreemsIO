import { StateNode, TLTextShape, toRichText } from 'tldraw'
import 'tldraw/tldraw.css'
import { Heart } from '../../shared/icons/heart'

const OFFSET = 12

// [1]
export class StickerTool extends StateNode {
	static override id = 'sticker'

	static meta = {
		icon: <Heart />,
		label: 'Sticker',
		kbd: 's',
	}

	// [a]
	override onEnter() {
		this.editor.setCursor({ type: 'cross', rotation: 0 })
	}

	// [b]
	override onPointerDown() {
		const { currentPagePoint } = this.editor.inputs
		this.editor.createShape<TLTextShape>({
			type: 'text',
			x: currentPagePoint.x - OFFSET,
			y: currentPagePoint.y - OFFSET,
			props: { richText: toRichText('❤️') },
		})
	}
}
