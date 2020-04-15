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
    return (
      <>
        <div className="modal-background" onClick={this.props.onClose}>
          <div className="menu row">
            <button onClick={this.props.onClose} className="menu-close-button"><FontAwesomeIcon icon="times" /></button>
            {this.props.children}
          </div>
        </div>
      </>
    );
  }
}

export default ModalDialog;
