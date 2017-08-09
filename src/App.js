import React, { Component } from 'react'
import Slider from 'rc-slider'
import moment from 'moment'

import Presets from './presets.js'

import './App.css'
import 'rc-slider/assets/index.css'

class App extends Component {
    state = {
        start: moment().hours(6).minutes(0).seconds(0).milliseconds(0),
        presets: Presets,
        selectedPreset: Presets.Weekday.name,
        sliders: Presets.Weekday.values
    }

    _handleChange = (index, newValue) => {
        const { selectedPreset, sliders } = this.state

        if (selectedPreset !== 'Custom') {
            this.setState({
                selectedPreset: 'Custom'
            })
        }

        const oldTotalExcludingCurrent = sliders
            .filter((val, idx) => idx !== index)
            .reduce((prev, curr) => prev + curr, 0)

        const newTotalExcludingCurrent = 1 - newValue

        const numberOfSlidersToModify = sliders.length - 1

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
            ],
            presets: {
                ...state.presets,
                Custom: {
                    name: 'Custom',
                    values: sliders
                }
            }
        }))
    }

    _selectPreset = presetName => {
        this.setState(state => ({
            selectedPreset: presetName,
            sliders: state.presets[presetName].values
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
        const { start, sliders, selectedPreset, presets } = this.state

        return (
            <div className="app">
                {sliders.map((value, idx) =>
                    <div key={idx} className="slider-wrap">
                        <p className="slider-date">
                            {moment(start)
                                .add(15 * idx, 'minutes')
                                .format('H:mm A')}
                        </p>

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

                <ul className="presets">
                    {Object.keys(presets).map(key =>
                        <li
                            className={`preset ${selectedPreset === key &&
                                'preset--selected'}`}
                            key={key}
                            onClick={() => this._selectPreset(key)}
                        >
                            {key}
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default App
