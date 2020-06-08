import React from 'react'
export default (props) => {
  const errorCheck = (props.error === undefined) ? false : !props.error;
  return (
    <div className={`input${errorCheck ? ' error' : ''}`} >
      < label className={`${props.disabled ? `disabled` : ''}`}>
        <span className="input-label">{props.label}</span>
        <input disabled={props.disabled} value={props.value} id={props.id} onChange={props.onChangeHandler}></input>
      </ label>
    </div>
  )
}