import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { Dashboard } from '@/components/dashboard'

export default async function Home() {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="h-full">
      <Dashboard />
    </div>
  )
}
