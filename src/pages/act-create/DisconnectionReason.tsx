import { useDispatch } from 'react-redux';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { nextFormStep } from '../../store/navigationSlice';
import Radio from '../../components/ui/radio';
import { Button } from '../../components/ui/button';

const SWITCHING_OPTIONS = [
  { id: 'debt', value: 'debt', label: 'Неполная оплата коммунальной услуги по электроснабжению' },
  { id: 'other', value: 'other', label: 'Иное' },
];

function DisconnectionReason() {
  const dispatch = useDispatch();
  const fm = useFormContext();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleNext = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    const isValid = await fm.trigger();

    if (isValid) {
      try {
        const value = fm.getValues().switchingDevice;
        sessionStorage.setItem('switchingDevice', value);
        dispatch(nextFormStep());
      } catch (error) {
        console.error('Ошибка при сохранении данных:', error);
        setSubmitError('Произошла ошибка. Пожалуйста, попробуйте ещё раз.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-25 relative flex h-full flex-col px-5">
      <div className="flex w-full flex-col gap-5">
        <div className="flex w-full flex-col gap-3">
          <label className="text-14-20-regular">Основание введения ограничения (приостановления) режима потребления: </label>
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
        </div>
          <Button
            type="button"
            onClick={handleNext}
            disabled={isSubmitting || !fm.watch('switchingDevice')}
          >
            {isSubmitting ? 'Сохранение...' : 'Продолжить'}
          </Button>
        </div>
      </div>
  );
}

export default DisconnectionReason;
