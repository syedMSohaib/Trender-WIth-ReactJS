import React, { Component } from 'react';
import axios from 'axios';
import './style.css';

class YoutubeDetails extends Component {
    constructor(props){
        super(props);
        this.getYotubeChannelInfo = this.getYotubeChannelInfo.bind(this);
        this.state = {
            videoInfo: '',

        };
        
    }
    
    
    getYotubeChannelInfo(id){
        axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=AIzaSyDm_N69dmq-Jz3nm8Om2dcY0tuIONcg1RY`)
        .then((response) => {

            var data = response.data.items[0];
            
            const videoDetails = [  data.snippet.title,
                                    data.snippet.description,
                                    data.snippet.channelId,
                                    data.snippet.channelTitle,
                                    data.snippet.publishedAt,
                                    data.snippet.thumbnails.medium.url,
                                    data.statistics.viewCount,
                                    data.statistics.likeCount,
                                    data.statistics.dislikeCount,
                                    data.statistics.commentCount ];

var html = `       
  <div class="row">
  <div class="col-xs-12 col-md-12">
      <div class="media">
          <a href="#" class="pull-left">
              <a href="https://www.youtube.com/watch?v=${this.props.id}">
              <img class="span2" style="width:246px;border-radius:4px" src=
              "${videoDetails[5]}" alt=""></a>
          </a>
          <div style="margin-left:10px" class="media-body">
              <h3 style="margin-top: 2px;font-size:1.3rem">
                <a style="color:black" href="https://www.youtube.com/watch?v=${this.props.id}">
                ${videoDetails[0]}<a/>
                </h3>
              <small style="margin-top: -5px; font-size:0.9rem">
                <a style="color:black" href="https://www.youtube.com/channel/${videoDetails[2]}"> ${videoDetails[3]} </a>
              &nbsp;&nbsp; ${videoDetails[6]} views</small>1
              <p style=" margin-bottom: 6px; margin-top:7px; font-size:0.9rem">
                  ${videoDetails[1].substr(0, 194)}
              </p>
              <p style="margin-top:10px; font-size:0.8rem">
                  <i class="fa fa-thumbs-up" aria-hidden="true"></i>&nbsp;${videoDetails[7]} &nbsp;&nbsp;
                  <i class="fa fa-thumbs-down" aria-hidden="true"></i>&nbsp;${videoDetails[8]} &nbsp;
                  <i class="fa fa-comment" aria-hidden="true"></i>&nbsp;${videoDetails[9]}
              </p>
          </div>
      </div>
  </div>
</div>   
<br/>         `;
  
            this.setState({videoInfo: html});
    
        })
        .catch(function (error) {
          console.log(error);
        });
        
    }


    componentWillMount(){
        this.getYotubeChannelInfo(this.props.id);
    }


    render() {
        if(!this.state.videoInfo)
            return '<h1>Loading...</h1>';

        return (
            <div>
              <div className="panel-list">
                { //console.log(item);
                  
                    <div>                    
                        <div dangerouslySetInnerHTML={{__html: this.state.videoInfo}} />
                    </div>
                  

                }
              </div>
            </div>
        );
    }
}

export default YoutubeDetails;