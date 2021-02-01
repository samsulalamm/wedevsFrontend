import React, {Component} from 'react';
import App from "../../App";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Link, withRouter} from "react-router-dom";
import {toast} from "react-toastify";
import {FaLongArrowAltLeft} from "react-icons/all";
import {add, getDetails, getList, update} from "../../services/baseServices";
import {FILE_BASE_URL} from "../../helper/env";

class Add extends Component {
  constructor() {
    super();
    this.state = {
      formData: {image: ''},
      isFormValidated: false,
      isSubmitting: false,
      productInfo: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    getDetails('products', this.props.match.params.id)
      .then(res => {
        console.log(res.response.items)
        let formData = {...this.state.formData}
        formData.title = res.response.item.title
        formData.description = res.response.item.description
        formData.price = res.response.item.price
        formData.file_attach = res.response.item.file_attach
        this.setState({formData,productInfo: res.response.item, isLoading: false})
      })
      .catch(errMsg => {
        console.log('Err Msg: ', errMsg)
      })
  }

  handleInputOnChange = (e) => {
    const formData = {...this.state.formData};
    formData[e.target.name] = e.target.value;
    this.setState({formData}, () => {
      console.log(this.state.formData);
    });
  }


  handleUpdateProduct = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({isFormValidated: true})
    } else {
      this.setState({isSubmitting: true}, () => {
        let formData = {...this.state.formData}
        formData._method = 'put'
        update('products', this.props.match.params.id,formData)
          .then(res => {
            this.props.history.push(`/`);
            toast.success("Product has been updated successfully.");
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
          <h2 className="page-title">Update Product</h2>
          <div className="ml-auto">
            <Link to={`${process.env.PUBLIC_URL}/`}
                  className="btn btn-sm btn-link"><FaLongArrowAltLeft/> Back to List</Link>
          </div>
        </div>

        {
          this.state.isLoading ?
            <div className={`card-block`}>
              <div className="block-body">
                Loading...
              </div>
            </div>
            :

            <div className="card-block">
              <div className="block-body">
                <>
                  <Form
                    noValidate
                    validated={this.state.isFormValidated}
                    onSubmit={this.handleUpdateProduct}>
                    <Form.Group as={Row} controlId="displayOrShopName">
                      <Form.Label column sm="3">
                        Title <span className="text-danger">*</span>
                      </Form.Label>
                      <Col sm="9" md={8} lg={7}>
                        <Form.Control
                          name={"title"}
                          defaultValue={formData.title}
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
                          defaultValue={formData.description}
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
                          defaultValue={formData.price}
                          onChange={this.handleInputOnChange}
                          required
                          type="number"/>
                        <Form.Control.Feedback type="invalid">Please enter price.</Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="displayOrShopName">
                      <Form.Label column sm="3">
                        Image
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
                          type="file"/>
                      </Col>

                    </Form.Group>

                    <Form.Group as={Row} controlId="displayOrShopName">
                      <Form.Label column sm="3">

                      </Form.Label>
                      <Col sm="9" md={8} lg={7}>
                        <div className="user-avatar">
                          <img
                            src={FILE_BASE_URL + formData?.file_attach?.folder_name + '/' + formData?.file_attach?.file_name}
                            alt="" style={{width: "40px", height: "40px"}}/>
                        </div>
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
        }
      </App>
    );
  }
}

export default withRouter(Add);