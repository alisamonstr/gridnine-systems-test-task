import React, { memo, useContext } from 'react'
import styled from 'styled-components/macro'
import { Container } from '@material-ui/core'

import { FlightCard, FlightsFilter } from '../components'
import { FlightsContext } from '../contexts'

const Content = styled.main`
  position: relative;
  display: flex;
`
const FlightsList = styled.div`
  flex: 1;
  height: 200px;
  margin-left: 275px;
  @media (max-width: 800px) {
    margin-left: 0;
    margin-top: 64px;
  }
`
const NoData = styled.div`
  text-align: center;
  padding: 40px;
`

const Flights = memo(() => {
  const { flights } = useContext(FlightsContext)
  return (
    <Container>
      <Content>
        <FlightsFilter />
        <FlightsList>
          {Boolean(flights.length) &&
            flights.map((item, key) => (
              <FlightCard flight={item.flight} key={key} />
            ))}
          {!flights.length && <NoData>Маршруты не найдены</NoData>}
        </FlightsList>
      </Content>
    </Container>
  )
})

export default Flights
