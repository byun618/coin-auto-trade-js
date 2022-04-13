import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
import ArrowIcon from '../../assets/png/arrow-black.png'
import { useGlobal } from '../../contexts/global'
import api from '../../lib/api'
import Button from '../public/Button'
import Image from '../public/Image'
import Input from '../public/Input'
import TickerIcon from '../public/TickerIcon'
import AddProgramModal from './AddProgramModal'

const TICKER_ICON_SIZE = 30

export type Ticker = {
  market: string
  korean_name: string
  english_name: string
}

interface TickerProps {
  ticker: Ticker
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  background-color: white;
  border-radius: 20px;
  padding: 15px;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;

  font-weight: 600;
  font-size: 12px;
  line-height: 14px;

  color: #333333;

  flex-grow: 1;
`

const Name = styled.div``

const Arrow = styled(Button)<{ isFold: boolean }>`
  padding: 10px 16px;
  transform: rotate(${({ isFold }) => (isFold ? 180 : 0)}deg);
`

const SettingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: 10px;
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`

const Label = styled.div`
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  color: #333333;
`

const SubmitButton = styled(Button)`
  border-width: 0;
  border-radius: 20px;
  padding: 9px 16px;

  font-weight: 700;
  font-size: 10px;
  line-height: 12px;
  color: #fff;
  background-color: #366e88;
`

function Ticker({ ticker }: TickerProps) {
  const router = useRouter()
  const { user } = useGlobal()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isFold, setIsFold] = useState<boolean>(true)
  const [startTime, setStartTime] = useState<string>('9')
  const [timeInterval, setTimeInterval] = useState<string>('24')

  const buttons = [
    {
      text: '취소',
      onClick: () => {
        onClickModalCancel()
      },
    },
    {
      text: '확인',
      onClick: () => {
        onClickModalSubmit()
      },
    },
  ]

  const onClickArrow = () => {
    if (user) {
      setIsFold(!isFold)
    } else {
      alert('로그인이 필요합니다.')
      router.push('/login')
    }
  }

  const onChangeStartTime = (event: ChangeEvent<HTMLInputElement>) => {
    const startTime = Number(event.target.value)
    if (startTime < 0 || startTime > 24) {
      alert('시작 시간은 0시부터 24시까지 입력해주세요.')
      return
    }

    setStartTime(event.target.value)
  }

  const onChangeTimeInterval = (event: ChangeEvent<HTMLInputElement>) => {
    const timeInterval = Number(event.target.value)
    if (timeInterval < 1 || timeInterval > 24) {
      alert('시간 간격은 1시간부터 24시간까지 입력해주세요.')
      return
    }

    setTimeInterval(event.target.value)
  }

  const onClickModalCancel = () => {
    setIsOpen(false)
  }

  const onClickModalSubmit = async () => {
    await api.post('/user-programs', {
      ticker,
      startTime: Number(startTime),
      timeInterval: Number(timeInterval),
    })

    setIsOpen(false)
  }

  return (
    <Wrapper>
      <InfoWrapper>
        <TickerIcon name={ticker.market} size={TICKER_ICON_SIZE} />
        <NameWrapper>
          <Name>{ticker.korean_name}</Name>
          <Name>{ticker.market}</Name>
        </NameWrapper>
        <Arrow isFold={isFold} onClick={onClickArrow}>
          <Image src={ArrowIcon} alt="arrow" width={19} height={11} />
        </Arrow>
      </InfoWrapper>
      {!isFold && (
        <SettingWrapper>
          <InputWrapper>
            <Label>시작 시간</Label>
            <Input
              type="number"
              name="startTime"
              value={startTime}
              onChange={onChangeStartTime}
              style={{
                fontWeight: 600,
                fontSize: '12px',
                color: '#333333',
                marginLeft: '10px',
                width: '30px',
                textAlign: 'center',
              }}
            />
            <Label style={{ marginLeft: '15px' }}>시간 간격</Label>
            <Input
              type="number"
              name="timeInterval"
              value={timeInterval}
              onChange={onChangeTimeInterval}
              style={{
                fontWeight: 600,
                fontSize: '12px',
                color: '#333333',
                marginLeft: '10px',
                width: '30px',
                textAlign: 'center',
              }}
            />
          </InputWrapper>
          <SubmitButton
            onClick={() => {
              setIsOpen(true)
            }}
          >
            추가
          </SubmitButton>
        </SettingWrapper>
      )}
      <AddProgramModal
        isOpen={isOpen}
        buttons={buttons}
        ticker={ticker}
        startTime={startTime}
        timeInterval={timeInterval}
      />
    </Wrapper>
  )
}

export default Ticker
