import 'tldraw/tldraw.css'
import { Plug } from './components/temp/plug'
import { MainFeatures } from './components/temp/main-features'

const App = () => {
	const showPlug = true

	return <>{showPlug ? <Plug /> : <MainFeatures />}</>
}

export default App
