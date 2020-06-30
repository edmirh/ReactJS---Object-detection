import React from 'react'
import {Link} from 'react-router-dom';

import models from '@cloud-annotations/models'

import styles from './styles.module.css'
let det = [];
let i = 0;
let score = 0;
let dets = '';
let stmcnt = 0;
let espcnt = 0;
let ethcnt = 0;
let prvi = 'STM32F4-DISC';
let drugi = 'Ethernet-W5500'; 
let treci = 'ESP32-WROOM';
const MODEL_PATH = process.env.PUBLIC_URL + '/model_web'
class DetectClass extends React.Component {
	state = {
		stm: 0,
		eth: 0,
		esp: 0,
		detec: '',
		ci: 0
	};
	continue = e => {
		e.preventDefault();
		this.props.nextStep();
	}
	
	back = e => {
		e.preventDefault();
		this.props.prevStep();
	}
	
  // reference to both the video and canvas
  videoRef = React.createRef();
  canvasRef = React.createRef();

  detectFromVideoFrame = (model, video) => {
    model.detect(video).then(predictions => {
      this.showDetections(predictions);

      requestAnimationFrame(() => {
        this.detectFromVideoFrame(model, video);
      });
    }, (error) => {
      console.log("Couldn't start the webcam")
      console.error(error)
    });
  };

  showDetections = predictions => {
    const {values, handleChange} = this.props;
    const ctx = this.canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const font = `${16}px 'ibm-plex-sans', Helvetica Neue, Arial, sans-serif`
    ctx.font = font;
    ctx.textBaseline = "top";

    predictions.forEach(prediction => {
      if(prediction.score > 0.97 && prediction.class != "Ethernet-W5500") {
      const x = Math.round(prediction.bbox[0]);
      const y = Math.round(prediction.bbox[1]);
      const width = Math.round(prediction.bbox[2]);
      const height = Math.round(prediction.bbox[3]);
      // Draw the bounding box.
      ctx.strokeStyle = "#0cbfd3";
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, width - (width/5), height - (height/5));
      // Draw the label background.
      ctx.fillStyle = "#0cbfd3";
      const textWidth = ctx.measureText(prediction.class).width;
      const textHeight = parseInt(font, 10);
      // draw top left rectangle
      ctx.fillRect(x, y, textWidth + 2, textHeight + 2);
      // draw bottom left rectangle
      ctx.fillRect(x, y + height - (height/5) - textHeight, textWidth + 2, textHeight + 5);

      // Draw the text last to ensure it's on top.
      ctx.fillStyle = "#000000";
      ctx.fillText(prediction.class, x, y);
      ctx.fillText((prediction.score*100).toFixed(1) + '%', x, y + height - (height/5) - textHeight);
	  score = (prediction.score*100).toFixed(1);
	let tmp = [];
	det[i] = prediction.class;
	if(det[i] == 'STM32F4-DISC' && det[i-1] != det[i]) {
		stmcnt = stmcnt + 1;
	}
	else if(det[i] == 'ESP32-WROOM' && det[i-1] != det[i]) {
		espcnt = espcnt + 1;
	}
	else {
		dets = det[i]
		console.log(dets);
	}
	values.detected[i] = dets[i];
	this.updateCnt(stmcnt, ethcnt, espcnt, dets[i], score);
	i = i + 1;
  }
    });
  };
  
  updateCnt = (cnt1, cnt2, cnt3, detecs, score) => {
		this.setState({
			stm: {cnt1},
			eth: {cnt2},
			esp: {cnt3},
			detec: {detecs},
			ci: {score}
		});
  }

  componentDidMount() {
    if (navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia) {
      // define a Promise that'll be used to load the webcam and read its frames
      const webcamPromise = navigator.mediaDevices
        .getUserMedia({
	audio: false,  
	video: {
	  	facingMode: 'environment',
	  	width: { ideal: 4096 },
        height: { ideal: 2160 }
	  }
        })
        .then(stream => {
          // pass the current frame to the window.stream
          window.stream = stream;
          // pass the stream to the videoRef
          this.videoRef.current.srcObject = stream;

          return new Promise(resolve => {
            this.videoRef.current.onloadedmetadata = () => {
              resolve();
            };
          });
        }, (error) => {
          console.log("Couldn't start the webcam")
          console.error(error)
        });

      // define a Promise that'll be used to load the model
      const loadlModelPromise = models.load(MODEL_PATH)
      
      // resolve all the Promises
      Promise.all([loadlModelPromise, webcamPromise])
        .then(values => {
          this.detectFromVideoFrame(values[0], this.videoRef.current);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  // here we are returning the video frame and canvas to draw,
  // so we are in someway drawing our video "on the go"
  render() {
    return (
      <React.Fragment> 
	<div className={styles.row}>
		<div className={styles.col}>
		    <h2 style={{fontFamily: "'Trebuchet MS',Arial,Helvetica,sans-serif"}}>Video detector</h2>
		    <video className={styles.video} autoPlay muted ref={this.videoRef} width="600" height="500" />
		    <canvas className={styles.canvas} ref={this.canvasRef} width="600" height="500" />
		</div>
		<div className={styles.col}>
			<h2 style={{fontFamily: "'Trebuchet MS',Arial,Helvetica,sans-serif"}}>Detected and stored in database</h2>
			<table id={styles.info}>
					<tbody>
						<tr>
							<th></th>
							<th>{prvi}</th>
							<th>{drugi}</th>
							<th>{treci}</th>
						</tr>
						<tr>
								<td style={{background: "#0cbfd3", color: "#fff", fontFamily: "'Trebuchet MS',Arial,Helvetica,sans-serif", fontWeight: "600"}}>Detections</td>
						       <td>{stmcnt}</td>
						       <td>-</td>
						       <td>{espcnt}</td>
						</tr>
					</tbody>
				</table>
			 <p style={{ fontFamily: "'Trebuchet MS',Arial,Helvetica,sans-serif" }}>Last detection: {dets} {score}%</p>	
		<Link to="/results" className={styles.resultsPC} onClick={this.continue}>Detection results</Link>
		</div>
	</div>
	<div className={styles.footerBtn}>    
	    <Link to="/results" className={styles.results} onClick={this.continue}>Detection results</Link>
	</div>
      </React.Fragment>
    );
  }
}

export default DetectClass
