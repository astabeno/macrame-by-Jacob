// components/Message.jsx
import { useTimeout } from '../../hooks/useTimeout'
import AccountCreationMessage from './AccountCreationMessage'
import LoginRequiredMessage from './LoginRequireMessage'
import NotAuthorizedMessage from './NotAuthorizedMessage'

export default function Message({ text }) {
  const visible = useTimeout(text === 'ACCOUNT_CREATION_SUCCESS' ? 2000 : 1000)
  
  if (!visible) return null
  
  switch (text) {
    case 'ACCOUNT_CREATION_SUCCESS':
      return <AccountCreationMessage />
    case 'LOGIN_REQUIRED': 
      return <LoginRequiredMessage />
    case 'NOT_AUTHORIZED':
      return <NotAuthorizedMessage />
    default:
      return <div>{text}</div>
  }
}