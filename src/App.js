import React, { Component } from 'react';
import svgGenerator from 'svg-generator';

import './App.css';
import convertData from './lib/io';
import CanvasContainer from './lib/canvas';
import Input from './lib/form/input';
import Save from './lib/form/save';

const defaultFormState = {
  type: 'png',
  start: 'fa6400',
  end: '3503fc',
  width: 100,
  height: 80,
  shapeSize: 3,
  noise: 15,
};

const defaultState = {
  form: defaultFormState,
  errors: {},
  hidden: false,
  saving: false,
  imageData: undefined,
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState
  }


  startSave = () => this.state.imageData === undefined ? '' : this.setState({ saving: true });

  hideForm = () => this.setState({ hidden: true });

  showForm = () => this.setState({ hidden: false });
  submitState = () => {
    const { start, end, ...formParams } = this.state.form;
    const svgParams = {
      ...formParams,
      colors: { startColor: start, endColor: end }
    }
    const imageData = svgGenerator.hexagon(svgParams);
    this.setState({ imageData });
  }

  resetState = () => this.setState(defaultState);

  validateHexCode = (value) => {
    const HEX_CODE_REGEXP = /^(#)?[0-9a-fA-F]{6,8}$/;
    return HEX_CODE_REGEXP.test(value)
  }

  validateNumbers = (input) => /^[0-9]*$/.test(input);

  // updateStateWithErrors = (target, value, valueValidated) => {}
  handleSaveSubmit = (e) => {
    console.log('execute convert & save', e.target.value);
    this.setState({ saving: false })
  }

  handleSaveChange = (e) => {
    const type = e.target.value;
    this.setState({
      form: {
        ...this.state.form,
        type
      }
    })
  };

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
    const { errors, form, saving, hidden, ...valuesChecked } = this.state;
    return (
      <div className="App">
        <div className="App-header">

          <h1>svg-generator</h1>
          <p className="tag-line">by Suraj Mistry</p>
        </div>

        {hidden ? (
          <button className="btn" type="submit" onClick={() => this.showForm()}>
            Show
          </button>) : (
            <div className="app-body">
              <p className="app-body__tag-line">
                Start by pressing submit to see the default configurations.
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
                  <Input
                    label={"Shape"}
                    disabled={true} />
                  <Input
                    label={"Direction"}
                    disabled={true} />
                </div>
                <div className="inputs__right-col">
                  < Input
                    label={"Width:"}
                    onChangeHandler={(e) => this.handleShapeChange(e, 'width')}
                    error={errors.width}
                    value={form.width}
                    class="input"
                  />
                  < Input
                    label={"Height:"}
                    onChangeHandler={(e) => this.handleShapeChange(e, 'height')}
                    error={errors.height}
                    value={form.height}
                    class="input"
                  />
                  < Input
                    label={"Size:"}
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
                  <button disabled={saving && !errors.all} className="btn" type="submit" onClick={(e) => this.submitState()} >

                    Submit
                  </button>
                  <button disabled={saving} className="btn" type="submit" onClick={() => this.resetState()}>
                    Reset
                  </button>

                  <button disabled={saving} className="btn dropdown" type="submit" onClick={() => this.startSave()}>
                    Save
                  </button>

                  <button disabled={saving} className="btn" type="submit" onClick={() => this.hideForm()}>
                    Hide
                  </button>
                  {saving
                    ? <Save
                      saveHandler={this.handleSaveSubmit}
                      changeHandler={this.handleSaveChange}
                      resetHandler={this.resetState}
                    />
                    : ''}
                </div>
              </div>
            </div>)}

        <CanvasContainer imageData={this.state.imageData} />

      </div>
    );
  }
}

export default App;
