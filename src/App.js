import _ from 'lodash'
import React from 'react'
import annyang from 'annyang'

import WebcamContainer from './webcam/WebcamContainer.react'
import ImageWithTrackingJS from './result/ImageWithTrackingJS.react'
import helloSound from './resources/hello.wav'

import './App.css'

class App extends React.Component {
  state = {
    idle: true,
    screenshots: null
  }

  componentDidMount = () => {
    const commands = {
      'spider': () => { document.getElementById('hello').play() },
      'shoot them up': () => { this.onStartCapture() },
      'capture': () => { this.onStartCapture() }
    }
    annyang.addCommands(commands)
    annyang.start()
  }

  onStartCapture = () => this.setState({ idle: false })

  onFinishCapture = (screenshots) => {
    this.setState({ idle: true, screenshots: screenshots })
  }

  renderWebcam = () => {
    return (
      <div className='webcam-container'>
        <WebcamContainer
          shouldStartCapture={!this.state.idle}
          onFinishCapture={this.onFinishCapture}
        />
      </div>
    )
  }

  renderImages = () => _.map(this.state.screenshots, (screenshot, index) => <ImageWithTrackingJS image={screenshot} key={index} />)

  renderResult = () => {
    if (!this.state.screenshots) return
    return (
      <div className='result-images'>
        {this.renderImages()}
      </div>
    )
  }
  
  render() {
    return (
      <div className='App'>
        {this.renderWebcam()}
        {this.renderResult()}
        <audio id='hello' src={helloSound}></audio>
        <div className='start-button' onClick={this.onStartCapture}>Start</div>
      </div>
    );
  }
}

export default App
