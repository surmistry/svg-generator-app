import React from 'react'

const SaveMenu = (props) => (
  <form action="" onSubmit={(e) => props.saveHandler(e)} onReset={() => props.resetHandler()}>
    <select className="save-menu" onChange={(e) => props.changeHandler(e)}>
      <option value="png">PNG</option>
      <option value="svg">SVG</option>
      <option value="b64">Base64</option>
    </select>
    <button type='submit' className="btn save">Save As</button>
    <button type='reset' className="btn">Cancel</button>
  </form>
)


export default SaveMenu