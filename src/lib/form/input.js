import React from 'react'
export default (props) => {
  console.log(props)
  const errorCheck = (props.error === undefined) ? false : !props.error;
  return (
    <div className={`input${errorCheck ? ' error' : ''}`} >
      {/* {props.error ? <p className="error-message">{props.errorMessage}</p> : ''} */}
      < label >
        <span className="input-label">{props.label}</span>
        <input id={props.id} onChange={props.onChangeHandler}></input>
      </ label>
    </div>
  )
}