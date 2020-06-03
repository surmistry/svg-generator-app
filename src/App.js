import React, { Component } from 'react';
import Input from './lib/form/input';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: {}, };
  }


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
    const { errors, ...valuesChecked } = this.state;
    console.log(this.state.errors)
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
                onChangeHandler={(e) => this.handleColorChange(e, 'startInput')}
                error={errors.startInput}
                class="input"
              />
              < Input
                label={"End"}
                onChangeHandler={(e) => this.handleColorChange(e, 'endInput')}
                error={errors.endInput}
                class="input" />
            </div>
            <div className="inputs__right-col">
              < Input
                label={"Canvas width:"}
                onChangeHandler={(e) => this.handleShapeChange(e, 'canvasWidth')}
                error={errors.canvasWidth}
                class="input"
              />
              < Input
                label={"Canvas height:"}
                onChangeHandler={(e) => this.handleShapeChange(e, 'canvasHeight')}
                error={errors.canvasHeight}
                class="input"
              />
              < Input
                label={"Shape Size:"}
                onChangeHandler={(e) => this.handleShapeChange(e, 'shapeSize')}
                error={errors.shapeSize}
                class="input"
              />
              < Input
                label={"Noise:"}
                onChangeHandler={(e) => this.handleShapeChange(e, 'noise')}
                error={errors.noise}
                class="input"
              />
            </div>
            <div className="submit-button">
              <button className="submit-btn" type="submit" disabled={errors.all}>

                Submit
              </button>
            </div>
          </div>
        </div>



      </div>
    );
  }
}

export default App;
