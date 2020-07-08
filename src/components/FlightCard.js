import React from 'react'
import styled from 'styled-components/macro'
import { first, last } from 'lodash-es'
import { Clock } from 'react-feather'

import {
  formatFlightDate,
  formatFlightDuration,
  formatFlightTime,
} from '../utils'

const Wrapper = styled.div`
  margin: 20px 0;
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 48px;
  padding: 0 20px;
  background: #425668;
  color: #d7dbde;
`
const Logo = styled.div`
  background: url("https://daisycon.io/images/airline/?width=330&height=120&iata=${(
    p,
  ) => p.code}") center center no-repeat ;
  background-size: contain;
  width: 110px;
  height: 48px;
`
const SelectButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  background: #f41c19;
  color: #fff;
  text-transform: uppercase;
`
const PriceInfo = styled.div`
  line-height: 1;
  text-align: right;
`
const Price = styled.div`
  font-size: 24px;
  font-weight: 300;
`
const Currency = styled.span`
  font-weight: 400;
`
const MainInfo = styled.div`
  display: flex;
  flex-flow: column;
  min-height: 140px;
  padding: 10px;
`
const Route = styled.div`
  padding: 0 10px;
  font-size: 16px;
`
const Arrow = styled.span`
  font-size: 18px;
  margin: 0 10px;
`
const AirportCode = styled.span`
  color: #425668;
`
const Hr = styled.div`
  height: 1px;
  margin: 10px 0;
  background: #e6e6e6;
`
const TimeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`
const DepartureTime = styled.div`
  display: flex;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`
const ArrivalTime = styled.div`
  display: flex;
  @media (max-width: 800px) {
    flex-direction: column-reverse;
  }
`
const Time = styled.span`
  font-size: 18px;
`
const Date = styled.span`
  color: #425668;
`
const Duration = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  svg {
    margin-right: 10px;
  }
`
const Carrier = styled.div`
  display: flex;
  align-items: flex-end;
  flex: 1;
  padding: 10px 10px 0 10px;
`

export const FlightCard = ({ flight }) => {
  const { segments, duration } = first(flight.legs)
  const departure = first(segments)
  const arrival = last(segments)
  const { departureCity, departureAirport } = departure
  const { arrivalCity, arrivalAirport } = arrival

  return (
    <Wrapper>
      <Header>
        <Logo code={flight.carrier.airlineCode} />
        <PriceInfo>
          <Price>
            {flight.price.total.amount} <Currency>₽</Currency>
          </Price>
          Стоимость для одного взрослого пассажира
        </PriceInfo>
      </Header>
      <MainInfo>
        <Route>
          <span>
            {departureCity.caption}, {departureAirport.caption}
            <AirportCode> ({departureAirport.uid})</AirportCode>
          </span>
          <Arrow>⟶</Arrow>
          <span>
            {arrivalCity.caption}, {arrivalAirport.caption}
            <AirportCode> ({arrivalAirport.uid})</AirportCode>
          </span>
        </Route>
        <Hr />
        <TimeInfo>
          <DepartureTime>
            <Time>{formatFlightTime(departure.departureDate)}</Time>
            <Date> {formatFlightDate(departure.departureDate)}</Date>
          </DepartureTime>
          <Duration>
            <Clock size={18} />
            {formatFlightDuration(duration)}
          </Duration>
          <ArrivalTime>
            <Date>{formatFlightDate(arrival.arrivalDate)}</Date>
            <Time> {formatFlightTime(arrival.arrivalDate)}</Time>
          </ArrivalTime>
        </TimeInfo>
        <Carrier>Рейс выполняет: {flight.carrier.caption}</Carrier>
      </MainInfo>
      <SelectButton>Выбрать</SelectButton>
    </Wrapper>
  )
}
