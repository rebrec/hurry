import React from 'react';
import { observer } from 'mobx-react'
import './Test.scss'
import img from './img/smile.png'

export default function (api){ 
    return class About extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
            };
        }

        render() {

            return (
                <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <h1>This is a view provided by the <i>Test plugin</i></h1>
                        <img className="testplugin-example-image" src={ img } />
                    </div>
                </div>
                </div>);
        }
    }
}