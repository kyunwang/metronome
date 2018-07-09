import React, { Component } from 'react';
import './Metronome.css';

import click1 from './click1.wav';
import click2 from './click2.wav';

class App extends Component {
	state = {
		isPlaying: false,
		bmp: 100,
		count: 0,
		beatsPerMeasure: 4,
	};

	// Create Audio objects with the files Webpack loaded,
	// and we'll play them later.
	click1 = new Audio(click1);
	click2 = new Audio(click2);

	handleBmpChange = event => {
		const bmp = event.target.value;
		this.setState({ bmp });
	};

	startStop = () => {
		this.click1.play();
	};

	render() {
		const { bmp, isPlaying } = this.state;

		return (
			<div className="metronome">
				<div className="bpm-slider">
					<div>{bmp} BMP</div>
					<input
						type="range"
						min="60"
						max="240"
						value={bmp}
						name=""
						id=""
						onChange={this.handleBmpChange}
					/>
				</div>
				<button onClick={this.startStop}>{isPlaying ? 'Stop' : 'Start'}</button>
			</div>
		);
	}
}

export default App;
