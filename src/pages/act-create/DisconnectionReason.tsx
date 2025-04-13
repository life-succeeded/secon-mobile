import { useDispatch } from 'react-redux'
import { useFormContext } from 'react-hook-form'
import { useState } from 'react'
import { nextFormStep } from '../../store/navigationSlice'
import Radio from '../../components/ui/radio'
import { Button } from '../../components/ui/button'
import { fp } from '../../lib/fp'

const SWITCHING_OPTIONS = [
  { id: 'debt', value: 'debt', label: 'Неполная оплата коммунальной услуги по электроснабжению' },
  { id: 'other', value: 'other', label: 'Иное' },
];

function DisconnectionReason() {
  const dispatch = useDispatch();
  const fm = useFormContext();
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleNext = async () => {
    const isValid = await fm.trigger()

    if (!isValid) return

    const value = fm.getValues().switchingDevice
    try {
      sessionStorage.setItem('switchingDevice', value)
      dispatch(nextFormStep())
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error)
      setSubmitError('Произошла ошибка. Пожалуйста, попробуйте ещё раз.')
    }
  }

  return (
    <div className="flex flex-col h-full relative px-5 pt-25">
      <div className="flex flex-col gap-4 overflow-auto">
        <label className="text-14-20-regular">Основание введения ограничения (приостановления) режима потребления:</label>
        {SWITCHING_OPTIONS.map((option) => (
          <Radio
            key={option.id}
            name="switchingDevice"
            value={option.value}
            label={option.label}
          />
        ))}

        {submitError && (
          <div className="text-12-16-medium text-red-500">{submitError}</div>
        )}
      </div>

        <Button className="w-full" type="button" onClick={handleNext}>
          Продолжить
        </Button>
      </div>
  )
}

export default DisconnectionReason;
