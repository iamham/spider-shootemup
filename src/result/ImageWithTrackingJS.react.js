import 'jquery.facedetection'
import PropTypes from 'prop-types'
import React from 'react'

const $ = window.$

class ImageWithTrackingJS extends React.Component {

  static propTypes = {
    image: PropTypes.string.isRequired,
  }

  componentDidMount = () => {
    this.detectFace()
  }

  detectFace = () => {
      console.log(this.image)
    $(this.image).faceDetection({
        complete: function (faces) {
            console.log(faces)
        }
    })
  }

  render() {
    return (
      <div className='image-with-trackingjs'>
        <img id='img' src={this.props.image} alt='Captured image' ref={(img) => { this.image = img }} /> />
      </div>
    );
  }
}

export default ImageWithTrackingJS
