import React, { Component } from 'react';
import axios from 'axios';
import './style.css';

class YoutubeRegion extends Component {
   
    constructor(props){
        super(props);
        this.state = {
            region: [],
            selectedRegion: '',
        };
        this.setReg = this.setReg.bind(this);
    }
    componentWillMount(){
        this.setState({selectedRegion: this.props.rg});
        
        axios.get('https://www.googleapis.com/youtube/v3/i18nRegions?part=snippet&hl=es_MX&key=AIzaSyDm_N69dmq-Jz3nm8Om2dcY0tuIONcg1RY')
        .then((response) => {
            this.setState({region: response.data.items})
        })
        .catch(function (error) {
          console.log(error);
        });        
    }
    componentWillReceiveProps(nextProps){
        if(this.state.selectedRegion !== nextProps.rg){
            this.setState({selectedRegion: nextProps.rg});
        }
    }
    setReg(e){
        this.props.getSelectval(e.target.value);
    }
    render() {
        return (
            <div className="col-md-3 pull-right">
                <select 
                        className="form-control" 
                        value={this.props.rg}
                        onChange={ (e) => this.setReg(e) }
                        name="region" id="region">
                {this.state.region.map((item, i) =>{
                  return(                    
                    <option key={i} value={item.snippet.gl}>{item.snippet.name}</option>
                  )

                })
                
                }
                </select>
            </div>
        );
    }
}

export default YoutubeRegion;