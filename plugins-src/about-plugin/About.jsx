import React from 'react';
import { observer } from 'mobx-react'
import './About.scss'

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
                        Version : { api.version }
                    </div>
                </div>
                </div>);
        }
    }
}