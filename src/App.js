import React, { Component } from 'react';
import Input from './lib/form/input';
import svgGenerator from 'svg-generator';
import './App.css';

const defaultState = {
  start: 'fa6400',
  end: '3503fc',
  width: 100,
  height: 80,
  shapeSize: 3,
  noise: 15,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: defaultState,
      errors: {},
    };
  } e

  submitState = () => {
    const { start, end, ...formParams } = this.state.form;
    const svgParams = {
      ...formParams,
      colors: { startColor: start, endColor: end }
    }
    const imageData = svgGenerator.hexagon(svgParams);
    console.log(svgParams)
    this.setState({ imageData });
  }

  resetState = () => this.setState({ errors: {}, form: defaultState })

  validateHexCode = (value) => {
    const HEX_CODE_REGEXP = /^(#)?[0-9a-fA-F]{6,8}$/;
    return HEX_CODE_REGEXP.test(value)
  }

  validateNumbers = (input) => /^[0-9]*$/.test(input);

  updateStateWithErrors = (target, value, valueValidated) => {

  }

  handleColorChange = (e, target) => {
    let { form, errors } = this.state;
    const targetCheck = this.validateHexCode(e.target.value);
    errors[target] = targetCheck;
    const { all, ...formErrors } = errors;
    const anyErrors = this.checkForErrors(formErrors);
    const setStateTarget = {
      errors: {
        ...errors,
        all: anyErrors,
        [target]: targetCheck,
      },
      form: { ...form, [target]: e.target.value }
    }
    this.setState(setStateTarget)
  }

  handleShapeChange = (e, target) => {
    let { form, errors } = this.state;
    const targetCheck = this.validateNumbers(e.target.value)
    errors[target] = targetCheck;
    const { all, ...formErrors } = errors;
    const anyErrors = this.checkForErrors(formErrors);
    const setStateTarget = {
      errors: {
        ...errors,
        all: anyErrors,
        [target]: targetCheck,
      },
      form: { ...form, [target]: e.target.value }
    }
    this.setState(setStateTarget)
  }

  checkForErrors = (values) => {
    for (let value in values) {
      if (!values[value]) return true;
    }
    return false
  }
  render() {
    const { errors, form, ...valuesChecked } = this.state;
    return (
      <div className="App">
        <div className="App-header">

          <h1>svg-generator</h1>
          <p className="tag-line">by Suraj Mistry</p>
        </div>
        <div className="app-body">

          <p className="app-body__tag-line">
            To get started, select any of the following inputs and press generate
          </p>
          <div className="body-inputs__container">
            <div className="inputs__left-col">
              < Input
                label={"Start"}
                onChangeHandler={(e) => this.handleColorChange(e, 'start')}
                error={errors.start}
                value={form.start}
                class="input"
              />
              < Input
                label={"End"}
                onChangeHandler={(e) => this.handleColorChange(e, 'end')}
                error={errors.end}
                value={form.end}
                class="input" />
            </div>
            <div className="inputs__right-col">
              < Input
                label={"Canvas width:"}
                onChangeHandler={(e) => this.handleShapeChange(e, 'width')}
                error={errors.width}
                value={form.width}
                class="input"
              />
              < Input
                label={"Canvas height:"}
                onChangeHandler={(e) => this.handleShapeChange(e, 'height')}
                error={errors.height}
                value={form.height}
                class="input"
              />
              < Input
                label={"Shape Size:"}
                onChangeHandler={(e) => this.handleShapeChange(e, 'shapeSize')}
                error={errors.shapeSize}
                value={form.shapeSize}
                class="input"
              />
              < Input
                label={"Noise:"}
                onChangeHandler={(e) => this.handleShapeChange(e, 'noise')}
                error={errors.noise}
                value={form.noise}
                class="input"
              />
            </div>
            <div className="submit-button">
              <button className="submit-btn" type="submit" onClick={(e) => this.submitState()} disabled={errors.all}>

                Submit
              </button>
              <button className="reset-btn" type="submit" onClick={() => this.resetState()}>
                Reset
              </button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
