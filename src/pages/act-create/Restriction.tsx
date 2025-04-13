import { useDispatch } from 'react-redux'
import { nextFormStep } from '../../store/navigationSlice'
import Radio from '../../components/ui/radio'
import { forwardRef, useImperativeHandle } from 'react'

export type RestrictionRef = {
  submitForm: () => Promise<boolean>
}

const Restriction = forwardRef<RestrictionRef>((_, ref) => {
  const dispatch = useDispatch()

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      dispatch(nextFormStep())
      return true
    }
  }))

  return (
    <div className="flex flex-col gap-5 pt-25 px-5">
      <label className="text-14-20-regular">Основание введения ограничения:</label>
      <Radio label="Имеется" name="reason" />
      <Radio label="Отсутствует" name="reason" />
    </div>
  )
})

export default Restriction
