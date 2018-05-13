import React, { Component } from 'react';
import trending from './github'

class GithubComp extends Component {

    constructor(props){
        super(props);
        this.state = {
            period: 'daily',
            isRepo: 'repositories',
        }
        this.handleChange = this.handleChange.bind(this);        
        this.getTrending = this.getTrending.bind(this);        
    }

    getTrending(){
        trending(this.state.isRepo, this.state.period)
        .then(repos => this.setState({ gitHubdata: repos }));
    }

    componentWillMount(){
        this.getTrending();
    }

    handleChange(e) {
        this.setState({ gitHubdata : undefined });
                // this.setState({ [ e.target.name ]: e.target.value });        
        this.setState({[ e.target.name ]: e.target.value }, () => {
            this.getTrending();
        });

    }
   
    render() {
 
        if (!this.state.gitHubdata)
            return <img style={{ display: 'block', 
                                 marginLeft: 'auto',  
                                 marginRight: 'auto', 
                                 width: 80, 
                             }} 
            src="https://loading.io/spinners/microsoft/lg.rotating-balls-spinner.gif" />         
        return (
           <div className="container" style={{ textAlign: 'left' }}>       
                <div className="row">
                    <div className="col-md-7">
                        {this.state.isRepo === 'repositories' ? (
                            <h5 style={{ marginLeft: "5%" }}>GitHub Trending Repositories</h5>
                        ) : (
                            <h5 style={{ marginLeft: "5%" }} >GitHub Trending Developers</h5>
                        )}
                    </div>
                    <div className="col-md-5">
                        <select name="period" value={this.state.period} className="form-control col-sm-5 pull-right"
                                onChange={(e) => this.handleChange(e) }>                        
                            <option value="daily">Trending: Today</option>
                            <option value="weekly">Trending: This Week</option>
                        </select>
                        <select name="isRepo"  value={this.state.isRepo} className="form-control  col-sm-7 pull-right"
                                onChange={ (e) => this.handleChange(e) }>
                            <option value="repositories">Trending: Repositories</option>
                            <option value="developer">Trending: Developers</option>
                        </select>
                    </div>
                </div>

                 <ul>
                {this.state.isRepo === 'repositories' ? (
                    this.state.gitHubdata.map( (res) =>              
                        <div key={res.author} className="row">
                        <div className="card-body">
                        <blockquote className="card-blockquote">
                        <a href={res.href}>
                            <h5 style={{ color:'#0366D6'}}>{res.author} / <b> {res.name} </b></h5>
                        </a>
                        <small style={{float:'left', fontSize: 12, color: "#586069"}}>
                            {res.description}
                        </small>
                        <footer>
                            <br/>
                            <p className="pull-left">
                                <i style={{ color: "#586069"}} 
                                className="fa fa-star" aria-hidden="true"></i>&nbsp;{res.stars}
                            </p>
                            <p className="pull-left">
                                <i style={{ color: "#586069", marginLeft:10}} className="fa fa-code-fork" 
                                aria-hidden="true"></i>&nbsp;{res.forks}
                            </p>                            
                            
                        </footer>
                        </blockquote>
                        </div>
                        </div>
                        )
                            ) : (
                                this.state.gitHubdata.map( (res) =>              

        <div key={res.username}>
        <ul className="thumbnails">
            <li style={{listStyle: 'none'}}>
                <div className="thumbnail right-caption " 
                style={{ width:900, borderColor: '#fff'}}>
                    <a href={res.href}><img className="span2" 
                    style={{ width:65, borderRadius:4}} 
                    src={res.avatar} alt=""/></a>
                    <div className="caption" style={{ marginTop:"-7%", marginLeft:"10%"}}>
                        <a href={res.href} >
                            <h4> {res.username} 
                            <span style={{ color:'#0366D6' }}> {res.name}  </span></h4></a>
                        <p> {res.description}</p>
                    </div>
                </div>
            </li>
        </ul>
        </div>
                        )
                )
                }
    
                </ul>
             </div>
        );
    }
}

export default GithubComp;