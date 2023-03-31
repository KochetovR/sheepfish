import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { setFilterValue } from '../../redux/productsSlice';


export default function Search() {
  const dispatch = useDispatch()

  const handleChangeSearch = ({value}) => {
    dispatch(setFilterValue(value))
  }
  return (
    <Input.Search
      placeholder="Для пошуку введіть назву товару або його опис"
      enterButton
      onInput={({target}) => handleChangeSearch(target)}
    />
  )
}
