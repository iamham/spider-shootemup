import React, { propTypes } from 'react'
import Webcam from 'react-webcam'

import './GridFloor.css'
 
export default class Canvas extends React.Component {

  propTypes = {
    cellCount: propTypes.number,
  }

  renderTable () {
    
  }

  render() {
    return (
      <div className='environment-gridfloor'>
        <table>
        
        </table>
      </div>
    )
  }
}