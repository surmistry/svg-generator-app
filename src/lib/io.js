import svgGenerator from 'svg-generator';
import btoa from 'btoa';



const convertBase64 = () => {
  const base64Digest = `data:image/svg+xml;base64,${btoa(this.state.imageData)}`;
  return (base64Digest);
}

const convertSvg = () => { }

const convertPng = () => {

};

/** @todo: Save file as SVG, PNG, base64
 * - drop-down 
 */


const FUNCTION_LUT = {
  'png': convertPng,
  'b64': convertBase64,
  'svg': convertSvg,
}


const convertData = (data, type) => {
  const dataProcessor = FUNCTION_LUT[type];
  return dataProcessor((data));
}

export default convertData;