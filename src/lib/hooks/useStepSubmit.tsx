import { useEffect } from 'react'

type SubmitFn = () => Promise<boolean>

export function useStepSubmit(
  step: number,
  submitFn: SubmitFn,
  registerSubmit: (step: number, fn: SubmitFn) => void
) {
  useEffect(() => {
    registerSubmit(step, submitFn)
  }, [step, submitFn, registerSubmit])
}
