import styled from '@emotion/styled'
import { ChangeEventHandler } from 'react'
import SearchIcon from '../../assets/png/search.png'
import Button from '../public/Button'
import Image from '../public/Image'

const ICON_SIZE = 15

interface SearchInputProps {
  style?: object
  type: string
  name: string
  value: string
  placeholder?: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  border-radius: 20px;
  padding: 8px 15px 8px 20px;

  background-color: #fff;
`

const Input = styled.input`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #333333;

  margin-left: 5px;

  border: none;
  width: 100%;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: 808080;
  }
`

const ImageWrapper = styled(Button)`
  width: ${ICON_SIZE}px;
  height: ${ICON_SIZE}px;
`

const SearchInput = ({
  style,
  type,
  name,
  value,
  placeholder,
  onChange,
}: SearchInputProps) => {
  return (
    <Wrapper>
      <Image
        src={SearchIcon}
        alt="search"
        width={ICON_SIZE}
        height={ICON_SIZE}
      />
      <Input
        style={style}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </Wrapper>
  )
}

export default SearchInput
