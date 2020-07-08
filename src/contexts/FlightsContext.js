import React, { memo, useState } from 'react'
import { orderBy } from 'lodash-es'

import flightsData from '../___mock__/flights.json'

const FlightsContext = React.createContext({})

const getOrderFnArguments = (order) => {
  switch (order) {
    case 'priceAsc':
      return [(item) => Number(item.flight.price.total.amount), 'asc']
    case 'priceDesc':
      return [(item) => Number(item.flight.price.total.amount), 'desc']
    case 'time':
      return [(item) => Number(item.flight.legs[0].duration), 'asc']
    default:
      return []
  }
}

const FlightsProvider = memo(({ children }) => {
  const [order, setOrder] = useState('priceAsc')
  const [isWithoutTransfer, setWithoutTransfer] = useState(false)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(20000)

  const filteredData = flightsData.result.flights
    .filter(
      (item) => !isWithoutTransfer || item.flight.legs[0].segments.length === 1,
    )
    .filter(
      (item) =>
        Number(item.flight.price.total.amount) >= minPrice &&
        Number(item.flight.price.total.amount) <= maxPrice,
    )

  const flights = orderBy(filteredData, ...getOrderFnArguments(order))

  return (
    <FlightsContext.Provider
      value={{
        flights,
        order,
        setOrder,
        isWithoutTransfer,
        setWithoutTransfer,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
      }}
    >
      {children}
    </FlightsContext.Provider>
  )
})

export { FlightsContext, FlightsProvider }
