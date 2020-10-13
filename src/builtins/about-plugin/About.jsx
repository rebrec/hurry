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
                <div class="container h-100">
                    <div class="row h-100 justify-content-center align-items-center">
                        <h1 className="col-12 text-center">
                            Version : { api.version }
                        </h1>
                    </div>
                </div>
            );
        }
    }
}