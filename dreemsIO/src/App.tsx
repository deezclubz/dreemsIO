import './App.css'
import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'

const App =()=> {

  return (
    <>
     <h1>yo!</h1>
     <div style={{ position: 'fixed', inset: 0 }}>
			  <Tldraw />
		</div>
    </>
  )
}

export default App
