import React, {Component} from 'react';
import App from "../../App";
import {Button, Form, Modal, Row, Col, OverlayTrigger, Tooltip} from "react-bootstrap";
import {BiLayerPlus, FiCheck, FiEdit, FiEye, FiPlus, FiTrash, FaFileExport, FiUpload, IoMdClose} from "react-icons/all";
import {withRouter, Link} from "react-router-dom";
import "../../assets/scss/order-list.scss";
import ModalDelete from "../common/Modal";
import {toast} from "react-toastify";
import {destroy, getList} from "../../services/baseServices";
import {FILE_BASE_URL} from "../../helper/env";

class List extends Component {

  constructor() {
    super();
    this.state = {
      productLists: [],
      isLoading: true,
    }
  }

  componentDidMount() {
    console.log(process.env.REACT_APP_API_BASE_URL)
    this.productList();
  }

  handleDeleteProduct = id => {
    destroy("products", id)
      .then(res => {
        this.productList();
        toast.success('Product has been deleted successfully');
      })
      .catch(errMsg => {
        toast.error(errMsg)
      })
  }

  productList = () => {
    getList('products')
      .then(res => {
        console.log(res.response.items)
        this.setState({productLists: res.response.items, isLoading:false})
      })
      .catch(errMsg => {
        console.log('Err Msg: ', errMsg)
      })
  }


  render() {
    return (
      <App layout="">
        <div className="main-content">
          <div className="page-header">
            <h2 className="page-title">Product List</h2>
            <div className="ml-auto">
              <Link to={`${process.env.PUBLIC_URL}/product/add`} className="btn btn-sm btn-secondary"><FiPlus/> Add
                Product</Link>
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
                  <table className="order-table table table-striped">
                    <thead>
                    <tr>
                      <th style={{width: '20px'}}>#</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th className={`text-center`}>Price</th>
                      <th className={`text-center`}>Image</th>
                      <th className={`text-center`}>Action</th>
                    </tr>
                    </thead>
                    <tbody>

                    {this.state.productLists.length > 0 ? this.state.productLists.map((item, index) => {
                      return (
                        <tr key={index + 1}>
                          <td>{index + 1}</td>
                          <td>
                            <div className="order-item">
                              <Link to={`${process.env.PUBLIC_URL}/product/details/${item.id}`}>
                                {item?.title}
                              </Link>
                            </div>
                          </td>

                          <td>
                            <div className="order-item">
                              {item?.description}
                            </div>
                          </td>

                          <td>
                            <div className="order-item">
                              {item?.price}
                            </div>
                          </td>

                          <td>
                            <div className="order-item">
                              <Link to={`${process.env.PUBLIC_URL}/product/details/${item.id}`}>
                                <div className="user-avatar">
                                  <img
                                    src={FILE_BASE_URL + item?.file_attach?.folder_name + '/' + item?.file_attach?.file_name}
                                    alt="" style={{width: "40px", height: "40px"}}/>
                                </div>
                              </Link>
                            </div>
                          </td>
                          <td style={{width: '150px'}}>
                            <div className="btn-group">
                              <OverlayTrigger
                                key="view"
                                placement="top"
                                overlay={
                                  <Tooltip id={`tooltip-view`}>
                                    View
                                  </Tooltip>
                                }
                              >
                                <Link to={`${process.env.PUBLIC_URL}/product/details/${item.id}`}
                                      className="btn btn-sm btn-default"><FiEye/></Link>
                              </OverlayTrigger>

                              <OverlayTrigger
                                key="view"
                                placement="top"
                                overlay={
                                  <Tooltip id={`tooltip-view`}>
                                    Edit
                                  </Tooltip>
                                }
                              >
                                <Link to={`${process.env.PUBLIC_URL}/product/edit/${item.id}`}
                                      className="btn btn-sm btn-default"><FiEdit/></Link>
                              </OverlayTrigger>
                              <OverlayTrigger
                                key="view"
                                placement="top"
                                overlay={
                                  <Tooltip id={`tooltip-view`}>
                                    Delete
                                  </Tooltip>
                                }
                              >
                                <ModalDelete handleDelete={() => this.handleDeleteProduct(item.id)}/>
                              </OverlayTrigger>
                            </div>
                          </td>
                        </tr>
                      );
                    }) :
                    <tr>
                      <td colSpan={6} className='text-center'> <p>No Product Found</p></td>
                    </tr>
                    }
                    </tbody>
                  </table>
                </div>
              </div>
          }
        </div>
      </App>
    );
  }
}

export default withRouter(List);
