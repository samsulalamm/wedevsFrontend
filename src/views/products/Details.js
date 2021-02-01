import React, {Component} from 'react';
import App from "../../App";
import {
  AiOutlineArrowLeft,
  FaStore,
  FiFilter,
  FiPlus,
  TiArrowUnsorted,
  FiChevronRight
} from "react-icons/all";
import {Link, withRouter, Redirect} from "react-router-dom";
import moment from "moment";
import {getDetails} from "../../services/baseServices";
import {FILE_BASE_URL} from "../../helper/env";
class Details extends Component {
  constructor() {
    super();
    this.state = {
      product: null,
      isDetailLoading: false,
      isLoadingData: true,
      productInfo: {},
    };
  }

  componentDidMount() {
    getDetails('products', this.props.match.params.id)
      .then(res => {
        this.setState({productInfo: res.response.item, isLoadingData: false})
      })
      .catch(errMsg => {
        console.log('Err Msg: ', errMsg)
      })
  }


  render() {
    if (this.state.redirect) {
      return <Redirect to='/products/list'/>
    }
    const details = this.state.productInfo;
    return (
      <App layout="boxed">
        <div className="page-header">
          <h2 className="page-title">Product Details</h2>
          <div className="ml-auto">
            <Link to={`${process.env.PUBLIC_URL}/`}
                  className="btn btn-sm btn-link mr-2"><AiOutlineArrowLeft/> Back to
              Product List</Link>
          </div>
        </div>


        {this.state.isLoadingData ?
          <div className={`card-block`}>
            <div className={`block-body`}>Loading...</div>
          </div>
          :
          <div className="main-content">
            <div className="card-block">
              <div className="block-body">
                <div className="product-list">
                  <div className="product-item">
                    <div className="product lg">
                      <div className="product-thumb">
                        <img src={FILE_BASE_URL + details?.file_attach?.folder_name + '/' + details?.file_attach?.file_name} alt="" style={{width: "70px", height: "70px"}}/>
                      </div>

                      <div className="product-desc">
                        <h4 className="product-title">{details?.title}</h4>
                        <h5>Tk. {details?.price}</h5>
                        <p className="date mb-0"><em>Created at
                          : </em> {moment(details?.created_at).format('LL')}</p>
                      </div>
                    </div>
                  </div>



                  <div className="card-block">
                    <ul className="desc-header-nav">
                      <li className={'active'} value="">
                        <span>Description</span>
                      </li>

                    </ul>
                    <div className="card-block">
                      <div className="block-body">
                        <div className={`entry-content`}
                             dangerouslySetInnerHTML={{__html: details?.description }}/>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        }
      </App>
    );
  }
}

export default withRouter(Details);