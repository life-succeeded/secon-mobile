import { useDispatch } from 'react-redux'
import { nextFormStep } from '../../store/navigationSlice'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { personalAccountResolver } from '../../lib/validators/act-create/personal-account-resolver'
import { useState, useImperativeHandle, forwardRef, useEffect } from 'react'

type FormData = {
  account: string
}

export type PersonalAccountRef = {
  submitForm: () => Promise<boolean>
  getValues: () => FormData
}

type Props = {
  defaultAccount?: string
  renderBelow?: React.ReactNode
}

const PersonalAccount = forwardRef<PersonalAccountRef, Props>(({ defaultAccount, renderBelow }, ref) => {
  const dispatch = useDispatch()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const fm = useForm<FormData>({
    defaultValues: {
      account: ''
    },
    resolver: yupResolver(personalAccountResolver)
  })

  // 👇 Установка значения из пропсов после загрузки
  useEffect(() => {
    if (defaultAccount) {
      fm.reset({ account: defaultAccount })
    }
  }, [defaultAccount])

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      const isValid = await fm.trigger()
      if (!isValid) return false
      return true
    },
    getValues: () => fm.getValues()
  }))

  return (
    <div className="pt-25 relative flex h-full flex-col px-5">
      <div className="flex w-full flex-col gap-5">
        <FormProvider {...fm}>
          <form className="flex w-full flex-col gap-3">
            <Input
              name="account"
              label={'Лицевой счёт'}
              placeholder="Введите лицевой счет"
            />
            {submitError && (
              <div className="text-sm text-red-500">{submitError}</div>
            )}
          </form>
        </FormProvider>
        {renderBelow && <div className="mt-8">{renderBelow}</div>}
      </div>
    </div>
  )
})

export default PersonalAccount
  
