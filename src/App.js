import React, { Component } from 'react'
import Slider from 'rc-slider'

import './App.css'
import 'rc-slider/assets/index.css'

class App extends Component {
    state = {
        sliderValue: 0
    }

    _handleChange = sliderValue =>
        this.setState({
            sliderValue
        })

    render() {
        const { sliderValue } = this.state

        return (
            <div className="app">
                <div className="slider-wrap">
                    <Slider
                        vertical
                        min={0}
                        max={1}
                        value={sliderValue}
                        onChange={this._handleChange}
                        defaultValue={0}
                        step={0.001}
                    />

                    <p className="slider-value">
                        {sliderValue}
                    </p>
                </div>

                <div className="slider-wrap">
                    <Slider
                        vertical
                        min={0}
                        max={1}
                        value={sliderValue}
                        onChange={this._handleChange}
                        defaultValue={0}
                        step={0.001}
                    />

                    <p className="slider-value">
                        {sliderValue}
                    </p>
                </div>

                <div className="slider-wrap">
                    <Slider
                        vertical
                        min={0}
                        max={1}
                        value={sliderValue}
                        onChange={this._handleChange}
                        defaultValue={0}
                        step={0.001}
                    />

                    <p className="slider-value">
                        {sliderValue}
                    </p>
                </div>
            </div>
        )
    }
}

export default App
