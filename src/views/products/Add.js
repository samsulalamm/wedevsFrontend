import React, {Component} from 'react';
import App from "../../App";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Link, withRouter} from "react-router-dom";
import {toast} from "react-toastify";
import {FaLongArrowAltLeft} from "react-icons/all";
import {add} from "../../services/baseServices";

class Add extends Component {
  constructor() {
    super();
    this.state = {
      formData: {image:''},
      isFormValidated: false,
      isSubmitting: false,
    };
  }

  componentDidMount() {
  }

  handleInputOnChange = (e) => {
    const formData = {...this.state.formData};
    formData[e.target.name] = e.target.value;
    this.setState({formData}, () => {
      console.log(this.state.formData);
    });
  }


  handleAddProduct = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({isFormValidated: true})
    } else {
      this.setState({isSubmitting: true}, () => {
        const formData = {...this.state.formData}
        add('products',formData)
          .then(res => {
            this.props.history.push(`/`);
            toast.success("Product has been added successfully.");
          })
          .catch(errMsg => {
            toast.error(errMsg);
            this.setState({isSubmitting: false})
          });
      })
    }
  }

  onFileChange = event => {
    this.setState({selectedFile: event.target.files[0]});
  };

  render() {
    const {formData} = this.state;

    return (
      <App layout="boxed">
        <div className="page-header">
          <h2 className="page-title">Add Product</h2>
          <div className="ml-auto">
            <Link to={`${process.env.PUBLIC_URL}/`}
                  className="btn btn-sm btn-link"><FaLongArrowAltLeft/> Back to List</Link>
          </div>
        </div>

        <div className="card-block">
          <div className="block-body">
            <>
              <Form
                noValidate
                validated={this.state.isFormValidated}
                onSubmit={this.handleAddProduct}>
                <Form.Group as={Row} controlId="displayOrShopName">
                  <Form.Label column sm="3">
                    Title <span className="text-danger">*</span>
                  </Form.Label>
                  <Col sm="9" md={8} lg={7}>
                    <Form.Control
                      name={"title"}
                      onChange={this.handleInputOnChange}
                      required
                      type="text"/>

                    <Form.Control.Feedback type="invalid">Please enter title.</Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="displayOrShopName">
                  <Form.Label column sm="3">
                    Description <span className="text-danger">*</span>
                  </Form.Label>
                  <Col sm="9" md={8} lg={7}>
                    <Form.Control
                      name={"description"}
                      onChange={this.handleInputOnChange}
                      required
                      as={'textarea'}
                      type="text"/>

                    <Form.Control.Feedback type="invalid">Please enter description.</Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="displayOrShopName">
                  <Form.Label column sm="3">
                    Price <span className="text-danger">*</span>
                  </Form.Label>
                  <Col sm="9" md={8} lg={7}>
                    <Form.Control
                      name={"price"}
                      onChange={this.handleInputOnChange}
                      required
                      type="number"/>
                    <Form.Control.Feedback type="invalid">Please enter price.</Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="displayOrShopName">
                  <Form.Label column sm="3">
                    Image <span className="text-danger">*</span>
                  </Form.Label>
                  <Col sm="9" md={8} lg={7}>
                    <Form.Control
                      name={"images"}
                      onChange={e => {
                        let formData = {...this.state.formData};
                        formData.image = e.target.files[0];
                        this.setState({formData}, () => {
                          console.log('ddd', this.state)
                        })
                      }}
                      required
                      type="file"/>
                  </Col>
                </Form.Group>

                <div className="mt-3">
                  <Button size="lg"
                          type={`submit`}
                          disabled={this.state.isSubmitting}
                          variant="primary">{this.state.isSubmitting ? 'Submitting...' : 'Submit'}</Button>
                </div>
              </Form>
            </>
          </div>
        </div>
      </App>
    );
  }
}

export default withRouter(Add);