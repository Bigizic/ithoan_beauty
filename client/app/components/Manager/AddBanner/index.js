/**
 *
 * Add Banner
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

import Input from '../../Common/Input';
import Switch from '../../Common/Switch';
import Button from '../../Common/Button';
import LoadingIndicator from '../../Common/LoadingIndicator';
import SelectOption from '../../Common/SelectOption';
import actions from '../../../actions';


class AddBanner extends React.Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.addBanner();
  };

  render() {
    const {
      bannerFormData,
      formErrors,
      bannerChange,
      isLoading,
      categories
    } = this.props;

    const categoryOptions = categories.map(cat => ({
      value: cat.slug,
      label: cat.name
    }));

    const linkTypeOptions = [
      { value: 'shop', label: 'Shop Page' },
      { value: 'category', label: 'Category Page' }
    ];

    return (
      <div className='add-product'>
        { isLoading && <LoadingIndicator /> }
        <form onSubmit={this.handleSubmit} noValidate>
        <Row>
          <Col xs='12' md='12'>
            <Input
              type={'images'}
              error={formErrors['images']}
              name={'images'}
              label={'Images'}
              placeholder={'Select multiple or one'}
              onInputChange={(name, value) => {
                bannerChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12' className='my-2'>
            <Switch
              id={'banner-active'}
              name={'isActive'}
              label={'Active?'}
              checked={bannerFormData.isActive}
              toggleCheckboxChange={value => bannerChange('isActive', value)}
            />
          </Col>
          <p   style={{ margin: '2% 1% 0% 2%', border: '1px solid #dfdfdf', padding: '2px 5px' }}>
            Setting default to "ON" would make your selected image the first banner on the homepage</p>
          <Col xs='12' md='12' className='my-2'>
            <Switch
              id={'banner-default'}
              name={'isDefault'}
              label={'Default?'}
              checked={bannerFormData.isDefault}
              toggleCheckboxChange={value => bannerChange('isDefault', value)}
            />
          </Col>
          <Col xs='12' md='12' className='my-2'>
            <Switch
              id={'banner-popup'}
              name={'isPopup'}
              label={'Show as Popup?'}
              checked={bannerFormData.isPopup}
              toggleCheckboxChange={value => bannerChange('isPopup', value)}
            />
          </Col>
        </Row>

        {bannerFormData.isPopup && (
          <>
            <hr />
            <h3 className='mb-3'>Popup Configuration</h3>
            <Row>
              <Col xs='12' md='6'>
                <Input
                  type={'text'}
                  error={formErrors['buttonText']}
                  name={'buttonText'}
                  label={'Button Text'}
                  placeholder={'e.g. Shop Now, View Sale'}
                  value={bannerFormData.buttonText}
                  onInputChange={(name, value) => {
                    bannerChange(name, value);
                  }}
                />
              </Col>
              <Col xs='12' md='6'>
                <Input
                  type={'number'}
                  error={formErrors['displayDuration']}
                  name={'displayDuration'}
                  label={'Display Duration (minutes)'}
                  placeholder={'5'}
                  value={bannerFormData.displayDuration}
                  onInputChange={(name, value) => {
                    bannerChange(name, value);
                  }}
                />
              </Col>
              <Col xs='12' md='6'>
                <SelectOption
                  error={formErrors['linkType']}
                  label={'Link Type'}
                  name={'linkType'}
                  value={{
                    value: bannerFormData.linkType,
                    label: bannerFormData.linkType === 'shop' ? 'Shop Page' : 'Category Page'
                  }}
                  options={linkTypeOptions}
                  handleSelectChange={(value) => {
                    bannerChange('linkType', value.value);
                  }}
                />
              </Col>
              {bannerFormData.linkType === 'category' && (
                <Col xs='12' md='6'>
                  <SelectOption
                    error={formErrors['categorySlug']}
                    label={'Select Category'}
                    name={'categorySlug'}
                    value={categoryOptions.find(opt => opt?.value === bannerFormData.categorySlug) || null}
                    options={categoryOptions}
                    handleSelectChange={(value) => {
                      bannerChange('categorySlug', value.value);
                    }}
                  />
                </Col>
              )}
            </Row>
          </>
        )}

        <hr />
        <div className='add-product-actions'>
          <Button type='submit' text='Add Banner' />
        </div>
      </form>
    </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.category.categories
  };
};

export default connect(mapStateToProps, actions)(AddBanner);
