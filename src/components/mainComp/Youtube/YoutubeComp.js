import React, { Component } from 'react';
import YoutubeDetails from './youtube';
import Region from './region';
import axios from 'axios';
import './style.css';

class YoutubeComp extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            youtubeTrendings: [],
            region: 'PK',
            
        }
        this.getRegion.bind(this);
        this.getYoutubeTrendings = this.getYoutubeTrendings.bind(this);
    }

    getYoutubeTrendings(){
       
    axios.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&chart=mostPopular&regionCode=${this.state.region}&maxResults=25&key=AIzaSyDm_N69dmq-Jz3nm8Om2dcY0tuIONcg1RY`)
        .then((response) => {
         this.setState({youtubeTrendings: response.data.items})
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    componentWillMount(){
        this.getYoutubeTrendings();
    }

    getRegion(reg){
        // this.setState({
        //     region : reg
        // });
        console.log(this.state.region);
    }

    render() {
        if(!this.state.youtubeTrendings)
            return '<h1>Loading...</h1>';
        return (
            <div id="layout-content" className="container layout-content-wrapper">
            <Region 
                   getSelectval={
                    (re) => this.setState({region : re},
                    () =>  this.getYoutubeTrendings())
                   } 
                   rg={this.state.region}/>
            <br/>
            <br/>

              <div className="panel-list">
                {this.state.youtubeTrendings.map((item, i) =>{

                  return(
                    <div className="container" key={item.id}>
                        <YoutubeDetails id={item.id}/>
                    </div>
                  )

                })
                
                }
              </div>
            </div>
        )
    }
}

export default YoutubeComp;