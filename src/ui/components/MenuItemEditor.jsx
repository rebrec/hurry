import React from 'react';
import './MenuItemDetail.scss';
import { observer } from 'mobx-react'
import store from '../../store/RootStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from 'react-bootstrap/Button';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Form from "react-jsonschema-form";

@observer
class MenuItemDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  
  render() {
    const { element } = this.props;
    if (!element) return (<></>);
    const {properties} = this.props.element;
    return (
      <>
        {/* { properties.type === "CONTAINER" ? <FormEditor fields={ Object.keys(element) } /> : undefined} */}
        { properties.type === "CONTAINER" ? <MenuItemDetailContainer element={ element } /> : undefined}
        { properties.type === "COMMAND"   ? <MenuItemDetailCommand   element={ element } /> : undefined}
      </>
    );
  }
}

@observer
class MenuItemDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmitted = this.onSubmitted.bind(this);
  }

  onSubmitted(data){
    if (data && data.formData){
      this.props.element.updateProperties(data.formData);
    }
  }
  
  render() {
    const log = (type) => console.log.bind(console, type);
    const schema = {
      title: "CONTAINER",
      required: ["caption"],
      properties: {
        caption : {
          title: "Caption",
          type: "string"
        },
        type: {
          title: "Type",
          type: "string",
          default: "COMMAND",
          readOnly: true
        },
      },
    }
    const { element } = this.props;
    const {properties} = this.props.element;
    console.log('STRINGIFY', JSON.stringify(properties));
    return (
      <>
        <Form 
          schema={schema}
          formData={properties}
          onSubmit={this.onSubmitted}
          onError={log("errors")} 
        />
      </>
    );
  }
}

@observer
class MenuItemDetailCommand extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmitted = this.onSubmitted.bind(this);
  }

  onSubmitted(data){
    if (data && data.formData){
      this.props.element.updateProperties(data.formData);
    }
  }
  
  render() {
    const log = (type) => console.log.bind(console, type);
    const uiSchema = {
      platform: {
        "ui:widget": "checkboxes"
      },
    }
    const schema = {
      type: "object",
      title: "COMMAND",
      required: ["caption"],
      properties: {
        caption : {
          title: "Caption",
          type: "string"
        },
        description: {
          title: "Description",
          type: "string"
        },
        shell: {
          title: "Shell",
          type: "string",
          enum: [
            "cmd", "powershell", "bash"
          ]
        },
        type: {
          title: "Type",
          type: "string",
          default: "COMMAND",
          readOnly: true
        },
        platform :{
          type: "array",
          title: "Platform",
          items: {
            type: "string",
            enum: ["win32", "linux"]
          },
          uniqueItems: true
        },
        commands :{
          title: "Commands",
          type: "array",
          items: {
            type: "string",
            default: "COMMAND",
          },
        },
      }
    }
    const { element } = this.props;
    const {properties} = this.props.element;
    console.log("properties ::::::", properties);
    console.log('STRINGIFY', JSON.stringify(properties));
    return (
      <>
        <Form 
          schema={schema}
          formData={properties}
          onSubmit={this.onSubmitted}
          uiSchema={uiSchema}
          onError={log("errors")} 
        />
      </>
    );
  }
}


@observer
class MenuItemDetailToolBar extends React.Component {
  constructor(props) {
    super(props);
    this.moveUp = this.moveUp.bind(this);
  }
  moveUp(){
    console.log('moveup');
    this.props.element.moveUp();
  }
  render() {
    const {element} = this.props;
    console.log(element);
    const disabled = element && element.properties.locked === true;
    return (
      <>
        { element && element.isContainer() && (
            <>
              <Button variant="primary" onClick={() => {element.addNewMenuItemContainer({type:"CONTAINER", caption: "New Container"})}} disabled={disabled} >Add Container</Button>
              <Button variant="primary" onClick={() => {element.addNewMenuItemElement({type:"COMMAND", caption: "New Command"})}} disabled={disabled}>Add Command</Button>
            </>
          )
        }
        <Button variant="primary" onClick={() => {element.moveUp()}} disabled={disabled}>Move Up</Button>{' '}
        <Button variant="primary" onClick={() => {element.moveDown()}} disabled={disabled}>Move Down</Button>{' '}
        <Button variant="primary" onClick={() => {element.moveToParent()}} disabled={disabled}>Move to Parent</Button>{' '}
        <Button variant="primary" onClick={() => {confirm("Are you sure to remove this element ?") && element.remove()}} disabled={disabled}>Remove</Button>{' '}
      </>
    );
  }
}



export {
  MenuItemDetail,
  MenuItemDetailToolBar
};
