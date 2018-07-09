import React, { Component } from 'react';
import './Metronome.css';

import click1 from './click1.wav';
import click2 from './click2.wav';

class App extends Component {
	state = {
		isPlaying: false,
		bpm: 100,
		count: 0,
		beatsPerMeasure: 4,
	};

	// Create Audio objects with the files Webpack loaded,
	// and we'll play them later.
	click1 = new Audio(click1);
	click2 = new Audio(click2);

	handleBpmChange = event => {
		const bpm = event.target.value;
		this.setState({ bpm });
	};

	startStop = () => {
		const { isPlaying, bpm } = this.state;

		if (this.state.isPlaying) {
			clearInterval(this.timer);
			this.setState({ isPlaying: false });
		} else {
			this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
			this.setState({ count: 0, isPlaying: true }, this.playClick);
		}
	};

	playClick = () => {
		const { count, beatsPerMeasure } = this.state;

		// The first sound will have a different sound then the rest
		if (count % beatsPerMeasure === 0) {
			this.click2.play();
		} else {
			this.click1.play();
		}

		// Keep track which beat to play
		this.setState(prevState => ({
			count: (prevState.count + 1) % prevState.beatsPerMeasure,
		}));
	};

	render() {
		const { bpm, isPlaying } = this.state;

		return (
			<div className="metronome">
				<div className="bpm-slider">
					<div>{bpm} bpm</div>
					<input
						type="range"
						min="60"
						max="240"
						value={bpm}
						name=""
						id=""
						onChange={this.handleBpmChange}
					/>
				</div>
				<button onClick={this.startStop}>{isPlaying ? 'Stop' : 'Start'}</button>
			</div>
		);
	}
}

export default App;
