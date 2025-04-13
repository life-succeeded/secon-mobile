import { useDispatch, useSelector } from 'react-redux'
import { nextFormStep } from '../../store/navigationSlice'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { useFormContext } from 'react-hook-form'

function ContactInfo() {
    const dispatch = useDispatch()

    const handleNext = () => {
        dispatch(nextFormStep())
    }

    const fm = useFormContext();

    const onNext = () => {
        try {
            handleNext()
        } catch (error) {
            console.error('Ошибка при сохранении контактной информации:', error)
        }
    }

    return (
        // <div className="flex w-full h-full flex-col gap-5 p-5 grid-rows-[1fr_auto]">
        <div className="flex w-full h-full flex-grow flex-col gap-3 p-5 pt-25 grid-rows-[auto_1fr_auto]">
            <div className='pt-25 flex-grow'>
                <Input
                    name="number"
                    label={'Контактный номер'}
                    placeholder="Введите контактный номер"
                />
                <Input
                    name="fullName"
                    label={'Потребитель'}
                    placeholder="Введите ФИО потребителя"
                />

                <div className="flex flex-col gap-2">
                    <label className="text-14-20-regular">Объект</label>
                    <Input name="address" placeholder="Введите адрес объекта" />
                </div>

            </div>
            <div className="">
                <Button onClick={() => onNext()} className="w-full" type="submit">
                    Продолжить
                </Button>
            </div>
        </div>
    )
}

export default ContactInfo
