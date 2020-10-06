import React from 'react';
import './ModalDialog.scss';
import { observer } from 'mobx-react'
import store from '../../store/RootStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


@observer
class ModalDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { zIndex } = this.props
    const index = zIndex || 40;
    return (
      <>
        <div className="modal-background" style={{zIndex: index}} onClick={this.props.onClose}>
          <div className="modal-box row">
            <button onClick={this.props.onClose} className="modal-box-close-button"><FontAwesomeIcon icon="times" /></button>
            <div className="col-sm-12 modal-box-content" onClick={(e)=>{e.stopPropagation();}}>
              {this.props.children}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ModalDialog;
