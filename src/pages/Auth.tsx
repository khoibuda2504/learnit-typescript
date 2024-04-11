type Props = {
  authRoute: string
}
const Auth = (props: Props) => {
  const {
    authRoute
  } = props
  return (
    <div>Auth {authRoute}</div>
  )
}

export default Auth