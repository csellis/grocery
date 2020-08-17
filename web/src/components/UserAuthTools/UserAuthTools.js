import { useAuth } from "@redwoodjs/auth";

const UserAuthTools = () => {
  const { loading, isAuthenticated, logIn, logOut } = useAuth()

  if (loading) {
    // auth is rehydrating
    return null
  }

  return (
    <button
      onClick={async () => {
        if (isAuthenticated) {
          await logOut({ returnTo: process.env.REDWOOD_ENV_AUTH0_REDIRECT_URI })
        } else {
          const searchParams = new URLSearchParams(window.location.search)
          await logIn({
            appState: { targetUrl: searchParams.get('redirectTo') },
          })
        }
      }}
    >
      {isAuthenticated ? 'Log out' : 'Log in'}
    </button>
  )
}

export default UserAuthTools