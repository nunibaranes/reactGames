import React, { Component } from 'react';
import './ColorPicker.css';

class ColorPicker extends Component {
    
    constructor(props = {}) {
        super(props);
        this.state = {
            colorBlock: null,
            chosenColor: null,
            colorStrip: null,
            xPosition: 0,
            yPosition: 0,
            ctx: '',
            ctxColorStrip: '',
            width: 0,
            height: 0,
            drag: false,
            rgbaColor: 'rgba(255,0,0,1)',
            hslColor: 'hsl(0,100%,50%)',
        };
    }
    componentDidMount () {
        this.colorBlock = document.getElementById('color-block');
        this.chosenColor = document.getElementById('chosen-color-box');
        this.colorStrip = document.getElementById('color-strip');
        this.ctx = this.colorBlock.getContext('2d');
        this.ctxColorStrip = this.colorStrip.getContext('2d');
        this.width = this.colorBlock.width;
        this.height = this.colorBlock.height;
        this.ctx.rect(0, 0, this.width, this.height);
        this.fillGradient();
    }
    fillGradient() {
        this.ctx.fillStyle = this.rgbaColor;
        this.ctx.fillRect(0, 0, this.width, this.height);

        let grdWhite = this.ctxColorStrip.createLinearGradient(0, 0, this.width, 0);
        grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
        grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
        this.ctx.fillStyle = grdWhite;
        this.ctx.fillRect(0, 0, this.width, this.height);

        let grdBlack = this.ctxColorStrip.createLinearGradient(0, 0, 0, this.height);
        grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
        grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
        this.ctx.fillStyle = grdBlack;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    /**
     * handleMousedown: set drag variable to true and change color by mousdown event
     */
    handleMousedown (e) {
        this.drag = true;
        // this.changeColor(e);
    }
    /**
     * handleMouseup: check if drag is true and change color by mouseup event
     */
    handleMouseup (e) {
        if (this.drag) {
            // this.changeColor(e);
        }
    }
    /**
     * handleMousemove: set drag variable to false
     */
    handleMousemove () {
        this.drag = false;
    }
    /**
     * changeColor: 
     * set x and y position, 
     * get rgb value throw imageData, 
     * set rgbColor 
     * convert rgb value to hsl
     * set hslColor 
     * ser chosenColor
     */
    // changeColor(e) {
    //     this.xPosition = e.offsetX;
    //     this.yPosition = e.offsetY;
    //     let imageData = this.ctx.getImageData(this.xPosition, this.yPosition, 1, 1).data;
    //     let r = imageData[0] ;
    //     let g = imageData[1];
    //     let b = imageData[2];
    //     this.rgbaColor = 'rgba(' + r + ',' + g + ',' + b + ',1)';
    //     this.hslColor = this.rgbToHsl(r, g, b);
    //     this.chosenColor.style.backgroundColor = this.rgbaColor;
    // }
    render() {
        return (
            <section className="color-picker" id="color-picker">
                <h2 className="title">Color Picker</h2>
                <div id="picker">
                    <div className="canvas-wrapper">
                        <canvas id="color-block" height="101" width="101"
                            onMouseDown={this.handleMousedown(this)}
                            onMouseUp={this.handleMouseup(this)}
                            onMouseMove={this.handleMousemove(this)}
                        ></canvas>
                        <canvas id="color-strip" height="101" width="0"></canvas>
                    </div>
                
                    <div className="chosen-color" id="chosen-color-box" style={{backgroundColor: 'red'}}></div>
                    <div className="chosen-color txt" id="chosen-color-hsl">{this.state.hslColor}</div>
                    <div className="chosen-color txt" id="chosen-color-rgb">{this.state.rgbaColor}</div>
                </div>
            </section>
        );
    }
}

export default ColorPicker;
