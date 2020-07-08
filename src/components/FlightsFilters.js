import React, { useContext, useState } from 'react'
import styled from 'styled-components/macro'
import { Menu } from 'react-feather'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import Box from '@material-ui/core/Box'
import Drawer from '@material-ui/core/Drawer'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import AppBar from '@material-ui/core/AppBar'
import { Toolbar } from '@material-ui/core'

import { FlightsContext } from '../contexts'

const Wrapper = styled.div`
  position: fixed;
  width: 255px;
  height: 100vh;
  padding: 36px 0;
  background: #d8d8d8;
  color: #425668;
`
const DrawerContent = styled.div`
  width: 80vw;
`
const Content = styled.div`
  padding: 20px;
  background: #ffffff;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.05);
`
const Title = styled.div`
  margin-bottom: 10px;
  font-weight: 600;
`
const FormLabel = styled(FormControlLabel)`
  margin-left: -8px;
  .MuiButtonBase-root {
    padding: 0 5px;
  }
  .MuiSvgIcon-root {
    width: 20px;
  }
`
const Input = styled.input`
  &:focus {
    outline-color: #0076ff;
  }
`

export const FlightsFilterContent = () => {
  const {
    order,
    setOrder,
    isWithoutTransfer,
    setWithoutTransfer,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
  } = useContext(FlightsContext)

  return (
    <Content>
      <Title>Сортировать</Title>
      <FormGroup>
        <RadioGroup
          value={order}
          onChange={(event) => setOrder(event.target.value)}
        >
          <FormLabel
            value="priceAsc"
            control={<Radio color="primary" />}
            label="- по возрастанию цены"
          />
          <FormLabel
            value="priceDesc"
            control={<Radio color="primary" />}
            label="- по убыванию цены"
          />
          <FormLabel
            value="time"
            control={<Radio color="primary" />}
            label="- по времени в пути"
          />
        </RadioGroup>
      </FormGroup>
      <Box mb={3} />
      <Title>Фильтровать</Title>
      <FormLabel
        control={<Checkbox color="primary" />}
        value={isWithoutTransfer}
        onChange={() =>
          setWithoutTransfer((isWithoutTransfer) => !isWithoutTransfer)
        }
        label="- без пересадок"
      />
      <Box mb={3} />
      <Title>Цена</Title>
      От{' '}
      <Input
        value={minPrice}
        onChange={(event) => setMinPrice(parseInt(event.target.value) || 0)}
      />
      <Box mb={2} />
      До{' '}
      <Input
        value={maxPrice}
        onChange={(event) => setMaxPrice(parseInt(event.target.value) || 0)}
      />
    </Content>
  )
}

export const FlightsFilter = () => {
  const isMobile = useMediaQuery('(max-width: 800px)')
  const [isOpen, setOpen] = useState(false)

  if (isMobile) {
    return (
      <>
        <AppBar>
          <Toolbar>
            <Menu onClick={() => setOpen(true)} />
          </Toolbar>
        </AppBar>
        <Drawer open={isOpen} onClose={() => setOpen(false)}>
          <DrawerContent>
            <FlightsFilterContent />
          </DrawerContent>
        </Drawer>
      </>
    )
  }

  return (
    <Wrapper>
      <FlightsFilterContent />
    </Wrapper>
  )
}
