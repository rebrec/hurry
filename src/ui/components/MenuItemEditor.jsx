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
          default: "COMMAND",
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
          default: "COMMAND",
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
          type: "array" ,
          items: {
            type: "string",
          }
        },
      }
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

    return (
      <>
        <Button variant="primary" onClick={() => {this.props.element.moveUp()}} >Move Up</Button>{' '}
        <Button variant="primary" onClick={() => {this.props.element.moveDown()}} >Move Down</Button>{' '}
        <Button variant="primary" onClick={() => {this.props.element.moveToParent()}} >Move to Parent</Button>{' '}
      </>
    );
  }
}


// class FieldEditor extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange(event) {
//     const text = event.target.value;
//     this.props.onChange(this.props.id, text);
//   }

//   render() {
//     return (
//       <div className="field-editor">
//         <input onChange={this.handleChange} value={this.props.value} />
//       </div>
//     );
//   }
// }

// class FormEditor extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
    
//     this.handleFieldChange = this.handleFieldChange.bind(this);
//   }

//   handleFieldChange(fieldId, value) {
//     this.setState({ [fieldId]: value });
//   }

//   render() {
//     this.props.fields.map(field => {
//       console.log('field', field);
//     })
//     const fields = this.props.fields.map(field => (
//       <FieldEditor
//         key={field}
//         id={field}
//         onChange={this.handleFieldChange}
//         value={this.state[field]}
//       />
//     ));

//     return (
//       <div>
//         {fields}
//         <div>{JSON.stringify(this.state)}</div>
//       </div>
//     );
//   }
// }

export {
  MenuItemDetail,
  MenuItemDetailToolBar
};
