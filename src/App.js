import React from 'react';
import './App.css';
import { ChromePicker } from 'react-color';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      color: "#ff0000",
      r: 255,
      g: 0,
      b: 0,
      c: 0,
      m: 1,
      y: 1,
      k: 0,
      x: 0.41,
      xy: 0.21,
      z: 0.02
    }
  }

  handleChange = (color, event) => {
    const k = Math.min(1 -  color.rgb.r/255, 1 - color.rgb.g/255, 1 - color.rgb.b/255);
    console.log( (1 -  color.rgb.r / 255 - k) / (1 - k))
    console.log( (1 -  color.rgb.r / 255 - k))

    this.setState({
      color: color.hex,
      r: color.rgb.r,
      g: color.rgb.g,
      b: color.rgb.b,
      k: k,
      c: (1 -  color.rgb.r / 255 - k) / (1 - k),
      m: (1 -  color.rgb.g / 255 - k) / (1 - k),
      y: (1 -  color.rgb.b / 255 - k) / (1 - k),
      x: this.convertRGBToX(color.rgb.r, color.rgb.g, color.rgb.b),
      xy: this.convertRGBToY(color.rgb.r, color.rgb.g, color.rgb.b),
      z: this.convertRGBToZ(color.rgb.r, color.rgb.g, color.rgb.b),
    });
  }


  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  convertToHex(r, g, b) {
    const rgb = b | (g << 8) | (r << 16);
    return '#' + (0x1000000 + rgb).toString(16).slice(1)  
  }

  u(value) { 
    if (value < 0.040450) { 
      return value / 12.92; 
    } 

    return Math.pow((value + 0.055) /  1.055, 2.4); 
  }

  ut(value) {
    if (value < 0.0031308) { 
      return 12.92 * value; 
    } 

    return 1.055 * Math.pow(value, 1 / 2.4) - 0.055; 
  }

  convertRGBToX (r, g, b) {
    return 41.2453 * this.u(r / 255) + 35.7580  * this.u(g / 255) + 18.0423 * this.u(b / 255);
  }

  convertRGBToY (r, g, b) {
    return 21.2671 * this.u(r / 255) + 71.5160  * this.u(g / 255) + 7.2169 * this.u(b / 255);
  }

  convertRGBToZ (r, g, b) {
    return 1.9334 * this.u(r / 255) + 11.9193  * this.u(g / 255) + 95.0227 * this.u(b / 255);
  }

  convertXYZToR(x, y, z) {
    const res = this.ut(3.2406 * (x / 100) - 1.5372 * (y / 100) - 0.4986 * (z / 100)) * 255;
    if(res > 255) {
      return 255
    }
    else if(res < 0) {
      return 0
    } 
    else {
      return res;
    }
  }

  convertXYZToG(x, y, z) {
    const res = this.ut(-0.9692660 * (x / 100) + 1.8760108 * (y / 100) + 0.0415560 * (z / 100)) * 255;
    if(res > 255) {
      return 255
    }
    else if(res < 0) {
      return 0
    } 
    else {
      return res;
    }
  }

  convertXYZToB(x, y, z) {
    const res = this.ut(0.0557 * (x / 100) - 0.204 * (y / 100) + 1.0570 * (z / 100)) * 255;
    if(res > 255) {
      return 255
    }
    else if(res < 0) {
      return 0
    } 
    else {
      return res;
    }
  }

  handleRGBChange = (e) => {
    let r = this.state.r,
      g = this.state.g,
      b = this.state.b;

    if(e.target.name === 'r') {
      r = e.target.value;
    }
    else if(e.target.name === 'g') {
      g = e.target.value
    }
    else {
      b = e.target.value;
    }
    const k = Math.min(1 -  r/255, 1 - g/255, 1 - b/255);
    this.setState({
      r: r,
      g: g,
      b: b,
      x: this.convertRGBToX(r, g, b),
      xy: this.convertRGBToY(r, g, b),
      z: this.convertRGBToZ(r, g, b),
      c: (1 -  r/255 - k) / (1 - k),
      m: (1 -  g/255 - k) / (1 - k),
      y: (1 -  b/255 - k) / (1 - k),
      k: k,
      color: this.convertToHex(r, g, b)
    });
  }

  handleCMYKChange = (e) => {     
    let c = this.state.c,
      m = this.state.m,
      y = this.state.y,
      k = this.state.k;

    if(e.target.name === 'c') {
      c = e.target.value;
    }
    else if(e.target.name === 'm') {
      m = e.target.value
    }
    else if(e.target.name === 'y') {
      y = e.target.value
    }
    else {
      k = e.target.value;
    }
    const r = 255*(1 - c)*(1 - k),
      g = 255*(1 - m)*(1 - k),
      b = 255*(1 - y)*(1 - k);

    this.setState({
      c: c,
      m: m,
      y: y,
      k: k,
      r: r,
      g: g,
      b: b,
      x: this.convertRGBToX(r, g, b),
      xy: this.convertRGBToY(r, g, b),
      z: this.convertRGBToZ(r, g, b),
      color: this.convertToHex(r, g, b)        
    });
  }

  handleXYZChange = (e) => {
    let x = this.state.x,
        xy = this.state.xy,
        z = this.state.z;

    if(e.target.name === 'x') {
      x = e.target.value;
    }
    else if(e.target.name === 'xy') {
      xy = e.target.value
    }
    else {
      z = e.target.value;
    }

    const r = this.convertXYZToR(x, xy, z),
      g = this.convertXYZToG(x, xy, z),
      b = this.convertXYZToB(x, xy, z);
    
    const k = Math.min(1 -  r/255, 1 - g/255, 1 - b/255);

      this.setState({
        c: (1 -  r/255 - k) / (1 - k),
        m: (1 -  g/255 - k) / (1 - k),
        y: (1 -  b/255 - k) / (1 - k),
        k: k,
        r: r,
        g: g,
        b: b,
        x: x,
        xy: xy,
        z: z,
        color: this.convertToHex(r, g, b)        
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App_left">
          <ChromePicker color={ this.state.color } className="color-picker" onChange={ this.handleChange }/>
        </div>
        <div className="App_right" style={{backgroundColor: this.state.color}}>
          <div className="color-forms" >
            <div className="fields">
              <label>R:</label>
              <input style={{  borderColor: this.state.color}}
                onChange={ this.handleRGBChange} name="r" value={this.state.r}/>
              <label>G:</label>
              <input style={{  borderColor: this.state.color}}
                onChange={ this.handleRGBChange} name="g" value={this.state.g}/>
              <label>B:</label>
              <input style={{  borderColor: this.state.color}}
                onChange={ this.handleRGBChange} name="b" value={this.state.b}/>
            </div>
            <div className="fields">
              <label>X:</label>
              <input style={{  borderColor: this.state.color}}
               onChange={ this.handleXYZChange} name="x" value={this.state.x}/>
              <label>Y:</label>
              <input style={{  borderColor: this.state.color}}
               onChange={ this.handleXYZChange} name="xy" value={this.state.xy}/>
              <label>Z:</label>
              <input style={{  borderColor: this.state.color}}
               onChange={ this.handleXYZChange} name="z" value={this.state.z}/>
            </div>
            <div className="fields">
              <label>C:</label>
              <input style={{  borderColor: this.state.color}}
                onChange={ this.handleCMYKChange} name="c" value={this.state.c}/>
              <label>M:</label>
              <input style={{  borderColor: this.state.color}}
                onChange={ this.handleCMYKChange} name="m" value={this.state.m}/>
              <label>Y:</label>
              <input style={{  borderColor: this.state.color}}
                onChange={ this.handleCMYKChange} name="y" value={this.state.y}/>
              <label>K:</label>
              <input style={{  borderColor: this.state.color}}
                onChange={ this.handleCMYKChange} name="k" value={this.state.k}/>
            </div>

          </div>

        </div>
      </div>
    );
  }
}

export default App;

