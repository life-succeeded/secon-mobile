import { useDispatch } from 'react-redux';
import { setActType, setFormStep } from '../../store/navigationSlice';
import { Button } from '../../components/ui/button';
import Radio from '../../components/ui/radio';
import { useFormContext } from 'react-hook-form';

const ACT_TYPES = [
  { id: 'act1', label: 'О ВВЕДЕНИИ ОГРАНИЧЕНИЯ ПОДАЧИ ЭЛЕКТРОЭНЕРГИИ', value: 'restriction' },
  { id: 'act2', label: 'О ВОЗОБНОВЛЕНИИ ПОДАЧИ ЭЛЕКТРОЭНЕРГИИ', value: 'resumption' },
  { id: 'act3', label: 'ОСУЩЕСТВЛЕНИЯ ПРОВЕРКИ ПРИБОРОВ УЧЕТА', value: 'inspection' },
  { id: 'act4', label: 'О САМОВОЛЬНОМ ПОДКЛЮЧЕНИИ К ЭЛЕКТРИЧЕСКИМ СЕТЯМ', value: 'unauthorized' },
];

function ActType() {
  const dispatch = useDispatch();
  const { trigger, getValues, setError, formState } = useFormContext();

  const onSubmit = async () => {
    const isValid = await trigger('actType');
    if (!isValid) return;

    const value = getValues('actType');
    if (!value) {
      setError('actType', { type: 'error', message: 'Выберите вид акта' });
      return;
    }

    dispatch(setActType(value));
    dispatch(setFormStep(5));
  };

  return (
    <div className="relative flex flex-col h-full px-5 pt-25">
      <div className="flex flex-col gap-4 overflow-auto">
        <label className="text-14-20-regular">Акт о:</label>

        {ACT_TYPES.map((type) => (
          <Radio
            key={type.id}
            name="actType"
            value={type.value}
            label={type.label}
          />
        ))}

        {typeof formState.errors.actType?.message === 'string' && (
          <div className="text-12-16-medium text-red-500">
            {formState.errors.actType.message}
          </div>
        )}
      </div>

        <Button
          className="w-full"
          type="button"
          onClick={onSubmit}
          disabled={formState.isSubmitting}
        >
          {formState.isSubmitting ? 'Загрузка...' : 'Продолжить'}
        </Button>
    </div>
  );
}

export default ActType;
