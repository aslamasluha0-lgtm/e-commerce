import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { showToast } from '@/redux/slices/toastSlice'

export const useToast = () => {
  const dispatch = useDispatch()

  const toast = useCallback(
    ({ type = 'info', message, description }) => {
      dispatch(showToast({ type, message, description }))
    },
    [dispatch]
  )

  const success = useCallback(
    (message, description) => toast({ type: 'success', message, description }),
    [toast]
  )
  const error = useCallback(
    (message, description) => toast({ type: 'error', message, description }),
    [toast]
  )
  const info = useCallback(
    (message, description) => toast({ type: 'info', message, description }),
    [toast]
  )
  const warning = useCallback(
    (message, description) => toast({ type: 'warning', message, description }),
    [toast]
  )

  return { toast, success, error, info, warning }
}
