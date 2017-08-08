import React, { Component } from 'react'
import Slider from 'rc-slider'

import './App.css'
import 'rc-slider/assets/index.css'

class App extends Component {
    state = {
        sliders: [0.25, 0.5, 0.25]
    }

    _handleChange = (index, newValue) => {
        const oldTotalExcludingCurrent = this.state.sliders
            .filter((val, idx) => idx !== index)
            .reduce((prev, curr) => prev + curr, 0)

        const newTotalExcludingCurrent = 1 - newValue

        const numberOfSlidersToModify = this.state.sliders.length - 1

        this.setState(state => ({
            sliders: [
                ...state.sliders
                    .slice(0, index)
                    .map(value =>
                        this.computeProportionalValue(
                            value,
                            oldTotalExcludingCurrent,
                            newTotalExcludingCurrent,
                            numberOfSlidersToModify
                        )
                    ),
                newValue,
                ...state.sliders
                    .slice(index + 1, state.sliders.length)
                    .map(value =>
                        this.computeProportionalValue(
                            value,
                            oldTotalExcludingCurrent,
                            newTotalExcludingCurrent,
                            numberOfSlidersToModify
                        )
                    )
            ]
        }))
    }

    computeProportionalValue(
        value,
        oldTotalExcludingCurrent,
        newTotalExcludingCurrent,
        numberOfSlidersToModify
    ) {
        if (oldTotalExcludingCurrent === 0)
            return newTotalExcludingCurrent / numberOfSlidersToModify

        return value / oldTotalExcludingCurrent * newTotalExcludingCurrent || 0
    }

    render() {
        const { sliders } = this.state

        return (
            <div className="app">
                {sliders.map((value, idx) =>
                    <div key={idx} className="slider-wrap">
                        <Slider
                            vertical
                            min={0}
                            max={1}
                            value={value}
                            onChange={newValue =>
                                this._handleChange(idx, newValue)}
                            step={0.001}
                        />

                        <p className="slider-value">
                            {Math.round(value * 100) / 100}
                        </p>
                    </div>
                )}
            </div>
        )
    }
}

export default App
