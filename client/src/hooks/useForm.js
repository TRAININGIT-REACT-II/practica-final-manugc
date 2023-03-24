import { useState } from 'react'

const useForm = (initialFormState = {}) => {
  const [formState, setFormState] = useState(initialFormState)

  const onChange = (evt) => {
    setFormState({
      ...formState,
      [evt.target.name]: evt.target.value,
    })
  }
  return {
    ...formState,
    formState,
    onChange,
    setFormState,
  }
}

export default useForm
