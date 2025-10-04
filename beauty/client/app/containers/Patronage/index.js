/**
 *
 * Navigation
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import { Link } from 'react-router-dom';

import { Col } from 'reactstrap';

import { sortBanners } from '../Homepage/actions';

import Button from '../../components/Common/Button';

const MyComponent = (props) => {
    const { modelUrl, item } = props;
    const sm = <div className='shop_category_image' style={{ background: `url(${modelUrl})` }}></div>
    const linkPlusName = `shop/category/${item.slug}`;
    return (
        <div className='category_count'>
        <Link to={linkPlusName}>{item.name}</Link>
        </div>
    );
};

class Patronage extends React.PureComponent {

  render() {
    const {
      categories,
      firstmodelBanners,
      cls, src, text, srcSec
    } = this.props;
    const modelUrl = firstmodelBanners ? firstmodelBanners.imageUrl : '';
    const shopLink = () => {
        this.props.history.push('/shop');
      };

    return (
        // <div style={{ background: `url(${modelUrl})` }} className='homeCategories'>
        <div className={cls && cls.length > 1 ? 'homeCategories patronageCategory last_video' : 'homeCategories patronageCategory'}>
          <div className="video-container">
              <video autoPlay muted playsInline loop>
              <source 
                src={src && src.length > 1 ? src : '/images/banners/skincare_video_1.webm'} 
                className="shop_category_video" 
                type="video/mp4" 
              />
                <source className="shop_category_video" src={srcSec && srcSec.length > 1 ? srcSec : '/images/banners/skincare_video_1.mp4'} type="video/mp4" />
              </video>
          </div>

        <div className="patronage_text_container">
            <p className="patronage_message">
              {text && text.length > 1 ? text : "Your Skin Deserves The Best Nourish It With Skincare That Enhances Your Natural Glow!"}
          </p>
          <Button className="patronage_button" text="SHOP NOW" onClick={shopLink} />
      </div>
    </div>

    );
  }
}

const mapStateToProps = state => {
    const banners = state.banner.homeBanners;
    const modelBanners = sortBanners(banners)[0];
    let tempCategories = [];
    for (const item of state.category.storeCategories) {
        if (item.slug !== 'all') tempCategories.push(item)
    }
  return {
    categories: tempCategories,
    firstmodelBanners: modelBanners[1],
  };
};

export default connect(mapStateToProps, actions)(Patronage);
