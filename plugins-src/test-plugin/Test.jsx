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
                        <img src={ img } />
                    </div>
                </div>
                </div>);
        }
    }
}