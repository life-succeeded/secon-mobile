import { useDispatch } from 'react-redux';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Radio from '../../components/ui/radio';
import { nextFormStep } from '../../store/navigationSlice';
import { Button } from '../../components/ui/button';

const schema = yup.object({
  switchingDevice: yup.string().required('Выберите вариант'),
});

type FormData = {
  switchingDevice: string;
};

const SWITCHING_OPTIONS = [
  { id: 'yes', value: 'yes', label: 'Имеется' },
  { id: 'no', value: 'no', label: 'Отсутствует' },
];

function SwitchingDevice() {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fm = useFormContext();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      sessionStorage.setItem('switchingDevice', data.switchingDevice);
      dispatch(nextFormStep());
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
      setSubmitError('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-25 relative flex h-full flex-col px-5">
      <div className="flex w-full flex-col gap-5">
          <div onSubmit={fm.handleSubmit(onSubmit)} className="flex w-full flex-col gap-3">
            <label className="text-14-20-regular">Коммутационный (вводной) аппарат:</label>
            <div className="flex flex-col gap-2">
              {SWITCHING_OPTIONS.map((option) => (
                <div key={option.id} className="items-start">
                  <Radio
                    name="switchingDevice"
                    value={option.value}
                    label={option.label}
                    checked={fm.watch('switchingDevice') === option.value}
                    onChange={() => {
                      fm.setValue('switchingDevice', option.value, { shouldValidate: true });
                    }}
                  />
                </div>
              ))}
            </div>

            {submitError && (
              <div className="text-sm text-red-500">{submitError}</div>
            )}

            <div className="absolute bottom-5 left-5 right-5">
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || !fm.watch('switchingDevice')}
              >
                {isSubmitting ? 'Сохранение...' : 'Продолжить'}
              </Button>
            </div>
          </div>
      </div>
    </div>
  );
}

export default SwitchingDevice;