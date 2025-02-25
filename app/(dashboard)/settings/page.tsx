"use client"
import { UserProfile } from "@clerk/clerk-react"

const SettingsPage = () => {
  return (
    <div className="max-w-screen-2xl flex justify-center items-center mx-auto w-full pb-10 -mt-24">
      <UserProfile />
    </div>
  )
}

export default SettingsPage