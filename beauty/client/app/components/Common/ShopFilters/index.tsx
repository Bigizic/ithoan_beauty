import React from 'react'
import { Col, Row } from 'reactstrap'
import ProductFilter from '@/components/Store/ProductFilter'
import SelectOption from '@/components/Common/SelectOption'

interface ShopFiltersCompProps {
  minLabel: number
  min: number
  max: number
  maxLabel: number
  all_currency: Record<string, string>
  selectCurrency: (currency: string) => void
  filterProducts: (key: string, value: any) => void
  totalProducts: number
  left: number
  right: number
  count: number
  order: string
  sortOptions: Record<
    string,
    {
      label: string
      value: string
    }
  >
}

const ShopFiltersComp: React.FC<ShopFiltersCompProps> = ({
  minLabel,
  min,
  max,
  maxLabel,
  all_currency,
  selectCurrency,
  filterProducts,
  totalProducts,
  left,
  right,
  count,
  order,
  sortOptions
}) => {
  return (
    <div className='mt-[6em] mb-[4em]'>
      <Col
        xs={{ size: 12, order: 1 }}
        sm={{ size: 12, order: 1 }}
        md={{ size: 12, order: 1 }}
        lg={{ size: 3, order: 1 }}
        className='p-0'
      >
        {minLabel > 0 && (
          <ProductFilter
            filterProducts={filterProducts}
            min={min}
            max={max}
            minLabel={minLabel}
            maxLabel={maxLabel}
            all_currency={all_currency}
            selectCurrency={selectCurrency}
          />
        )}
      </Col>

      <Row className="align-items-center mx-0 mb-4 mt-4 mt-lg-0 py-3 py-lg-0 bg-white shop-toolbar">
        <Col
          xs={{ size: 12, order: 1 }}
          sm={{ size: 12, order: 1 }}
          md={{ size: 5, order: 1 }}
          lg={{ size: 6, order: 1 }}
          className="text-center text-md-left mt-3 mt-md-0 mb-1 mb-md-0"
        >
          <span>showing: </span>
          {totalProducts > 0
            ? `${left}-${right} products of ${count} products`
            : `${count} products`}
        </Col>

        <Col
          xs={{ size: 12, order: 2 }}
          sm={{ size: 12, order: 2 }}
          md={{ size: 2, order: 2 }}
          lg={{ size: 2, order: 2 }}
          className="text-right pr-0 d-none d-md-block"
        >
          <span>sort by</span>
        </Col>

        <Col
          xs={{ size: 12, order: 2 }}
          sm={{ size: 12, order: 2 }}
          md={{ size: 5, order: 2 }}
          lg={{ size: 4, order: 2 }}
        >
          <SelectOption
            name="sorting"
            value={{ value: order, label: sortOptions[order].label }}
            options={Object.values(sortOptions)}
            handleSelectChange={(n: any, v: any) => {
              filterProducts('sorting', n.value)
            }}
          />
        </Col>
      </Row>
    </div>
  )
}

export default ShopFiltersComp