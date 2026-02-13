import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"

const Navbar = () => {

  return (
    <div className="flex justify-between p-5">
      <div className="font-bold">
        Char AI
      </div>
      <div>
        <SignedOut>
            <SignInButton/>
        </SignedOut>
        <SignedIn>
            <UserButton/>
        </SignedIn>
      </div>
    </div>
  )
}

export default Navbar
