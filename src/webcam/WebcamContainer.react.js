import React from 'react'
import PropTypes from 'prop-types'
import Webcam from 'react-webcam'

import { getFourRandomSeconds } from '../Utils'
import tickSound from '../resources/tick.wav'
import shutterSound from '../resources/capture.wav'

import './WebcamContainer.css'

let interval

export default class WebcamContaner extends React.Component {

  static propTypes = {
    shouldStartCapture: PropTypes.bool,
    onFinishCapture: PropTypes.func.isRequired,
  }

  state = {
    screenshots: []
  }

  componentDidMount = () => this.startCapture(this.props.shouldStartCapture)
  componentDidUpdate = () => this.startCapture(this.props.shouldStartCapture)
  setWebcamRef = (webcam) => this.webcam = webcam
 
  onCapture = () => {
    this.playSound('shutter')
    return this.webcam.getScreenshot()
  }

  stopCapture = () => {
    this.stopSound('tick')
    clearInterval(interval)
    this.props.onFinishCapture(this.state.screenshots)
  }

  startCapture = (shouldStartCapture, duration = 10) => {
    if (!shouldStartCapture) return

    this.playSound('tick')
    const fourRandomSeconds = getFourRandomSeconds(duration)
    let currentSecond = 0
    interval = setInterval(() => {
      if (currentSecond === duration) return this.stopCapture()
      if (currentSecond === fourRandomSeconds[this.state.screenshots.length]){
        this.state.screenshots.push(this.onCapture())
      }
      currentSecond += 1
    }, 1000)
  }

  playSound = (id) => {
    const sound = document.getElementById(id)
    sound.currentTime = 0
    sound.play()
  }
  
  stopSound = (id) => document.getElementById(id).pause()

  render() {
    return (
      <div className='webcam-canvas'>
        <Webcam
          audio={false}
          ref={this.setWebcamRef}
          screenshotFormat='image/jpeg'
        />
        <audio id='tick' src={tickSound}></audio>
        <audio id='shutter' src={shutterSound}></audio>
      </div>
    )
  }
}