import {PieChart, Legend} from 'react-easy-chart';
import React from 'react';
import {ToolTip} from './ToolTip'

/*export const CoolPieChart = ({business, sports, entertainment, politics, technology}) => {

 const mouseOverHandler = (d, e) =>{
    this.setState({
      showToolTip: true,
      top: e.y,
      left: e.x,
      value: d.value,
      key: d.data.key});
  }

  const mouseMoveHandler = (e) => {
    if (this.state.showToolTip) {
      this.setState({top: e.y, left: e.x});
    }
  }

  const mouseOutHandler = () => {
    this.setState({showToolTip: false});
  }

  const createTooltip = () => {
    if (this.state.showToolTip) {
      return (
        <ToolTip
          top={this.state.top}
          left={this.state.left}
        >
          The value of {this.state.key} is {this.state.value}
        </ToolTip>
      );
    }
    return false;
  }

 return (<PieChart
    data={[
      { key: "business" + " " + business, value: business, color: '#aaac84' },
      { key: "sports" + " " + sports, value: sports, color: '#dce7c5' },
      { key: "entertainment" + " " + entertainment, value: entertainment, color: '#e3a51a' },
      {key: "politics" + " " + politics, value: politics, color: "#69c2b0"},
      {key: "technology" + " " + technology, value: technology, color: "#a1d9ce"}
    ]}
    innerHoleSize={200}
    mouseOverHandler={mouseOverHandler}
    mouseOutHandler={mouseOutHandler}
    mouseMoveHandler={mouseMoveHandler}
    padding={10}
    styles={{
      '.chart_lines': {
        strokeWidth: 0
      },
      '.chart_text': {
        fontFamily: 'serif',
        fontSize: '1.25em',
        fill: '#333'
      }
    }}
  ></PieChart>

)
}
*/

export class CoolPieChart extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			showToolTip: false,
      		top: '0',
      		left: '0',
      		value: '0',
      		key: ""
		};
		this.mouseOverHandler = this.mouseOverHandler.bind(this);
		this.createTooltip = this.createTooltip.bind(this);
	}
	mouseOverHandler(d, e) {
    this.setState({
      showToolTip: true,
      top: e.y + "",
      left: e.x + "",
      value: d.value,
      key: d.data.key});
      //console.log("top " + e.y);
      //console.log("left " + e.x);
    //console.log(this.state.value);
    
  }

  mouseMoveHandler(e) {
    if (this.state.showToolTip) {
      this.setState({top: e.y + "", left: e.x + ""});
    }
  }

  mouseOutHandler() {
    this.setState({showToolTip: false});
  }
createTooltip () {
    if (true) {
      return (
        <ToolTip
          top={this.state.top}
          left={this.state.left}
        >
          {this.state.key} : {this.state.value} 
        </ToolTip>
      );
    }
    return (
        false
      );
    
    //return false;
  }
  
  render(){
 return( <div>{this.state.showToolTip && this.createTooltip()}
 	<PieChart
 	labels
    data={[
      { key: "BIZ"+":"+this.props.business  , value: this.props.business, color: '#aaac84' },
      { key: "SPORT"+":"+this.props.sport, value: this.props.sport, color: '#dce7c5' },
      { key: "ENT"+":"+this.props.entertainment , value: this.props.entertainment, color: '#e3a51a' },
      {key: "POL" + ":"+this.props.politics, value: this.props.politics, color: "#69c2b0"},
      {key: "TECH"+":"+this.props.tech, value: this.props.tech, color: "#a1d9ce"}
    ]}
    size={200}
    innerHoleSize={50}
    mouseOverHandler={this.mouseOverHandler}
    mouseOutHandler={this.mouseOutHandler.bind(this)}
    mouseMoveHandler={this.mouseMoveHandler.bind(this)}
    padding={10}
    styles={{
      '.chart_lines': {
        strokeWidth: 0
      },
      '.chart_text': {
        fontFamily: 'serif',
        fontSize: '1.25em',
        fill: '#333'
      },
      
    }}
  ></PieChart>
 </div>
);
}
}


CoolPieChart.defaultProps = { business: 0, sport: 0, entertainment:0, politics:0, tech:0 };
 /*<Legend 
  	styles={{}}
  	data={[
      { key: "BIZ"  , value: this.props.business, color: '#aaac84' },
      { key: "SPORT", value: this.props.sports, color: '#dce7c5' },
      { key: "ENT" , value: this.props.entertainment, color: '#e3a51a' },
      {key: "GEN", value: this.props.politics, color: "#69c2b0"},
      {key: "TECH", value: this.props.technology, color: "#a1d9ce"}
    ]} dataId={'key'} config={[
    {color: '#aaac84'},
    {color: '#dce7c5'},
    {color: '#e3a51a'},
    {color:'#69c2b0'},
    {color: '#a1d9ce'}
  ]} horizontal></Legend>*/
