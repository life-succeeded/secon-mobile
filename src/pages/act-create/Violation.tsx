import { useDispatch } from 'react-redux';
import { setViolation, nextFormStep } from '../../store/navigationSlice';
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import Radio from '../../components/ui/radio';
import { Button } from '../../components/ui/button';

const Violation = () => {
  const dispatch = useDispatch();
  const { watch, formState, setError, trigger } = useFormContext();
  const value = watch('violation');

  // При изменении значения — сохраняем в Redux
  useEffect(() => {
    if (value) {
      dispatch(setViolation(value));
    }
  }, [value, dispatch]);

  const onSubmit = async () => {
    const isValid = await trigger('violation');
    if (!isValid) return;

    if (!value) {
      setError('violation', {
        type: 'error',
        message: 'Выберите тип нарушения',
      });
      return;
    }

    dispatch(setViolation(value)); // ещё раз, на всякий случай
    dispatch(nextFormStep()); // переход на следующий шаг
  };

  return (
    <div className="flex h-full flex-col px-5 pt-25">
      <div className="flex w-full flex-col justify-center gap-4">
        <label className="text-14-20-regular">
          Нарушение потребителем введенного ограничения:
        </label>

        <Radio name="violation" value="1" label="Не выявлено" />
        <Radio name="violation" value="2" label="Выявлено" />

        {typeof formState.errors.violation?.message === 'string' && (
          <div className="text-12-16-medium text-red-500 mt-2">
            {formState.errors.violation.message}
          </div>
        )}
      </div>

      <div className="mt-auto mb-5">
        <Button className="w-full" type="button" onClick={onSubmit}>
          Продолжить
        </Button>
      </div>
    </div>
  );
};

export default Violation;
