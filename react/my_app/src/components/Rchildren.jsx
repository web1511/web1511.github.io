import React, { Component } from 'react'
import Axios from 'axios';


function Title (  {text,children} )  {
    // this.props = props ;
    
    return (
        <h2>
          {text}
          {children}
        </h2>
    );
}

class Rchildren extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            initImg : '',
            address:''
        }
        this.getInitInfo();
        console.log('constructor');
    }

    static getDrivedStateFormProps() {
        console.log('getDrivedStateFormProps');
    }
    componentDidMount() {
     
        console.log('componentDidMount');
    }
    render(){
        let { initImg ,address } = this.state;
        console.log('render');
        return (
            <Title text='hello,children的学习'>
                    <span>{address}</span>
                    <img src={ initImg } alt="" />
            </Title>
        )
    }
    getInitInfo = () => {
        Axios({
            baseURL:' https://www.easy-mock.com/mock/5c7c9b34a382685fa7ddb556/example',
            url:'/mock' ,
            method:'get'
         }).then( res => {
             let data  = res.data.data.projects;
             this.setState({
                 initImg : data[0].url,
                 address:  data[0].address
             })
         }) 
    }
}

export default Rchildren