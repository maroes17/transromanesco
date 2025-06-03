import { SignUp } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Crear Cuenta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Únete a TransRomanesco
          </p>
        </div>
        <SignUp
          appearance={{
            baseTheme: dark,
            elements: {
              formButtonPrimary: 
                "bg-blue-600 hover:bg-blue-700 text-sm normal-case",
              card: "bg-white shadow-none",
              headerTitle: "text-gray-900",
              headerSubtitle: "text-gray-600",
              socialButtonsBlockButton: 
                "border border-gray-300 text-gray-700 hover:bg-gray-50",
              formFieldLabel: "text-gray-700",
              formFieldInput: 
                "border border-gray-300 focus:border-blue-500 focus:ring-blue-500",
              footerActionLink: "text-blue-600 hover:text-blue-700"
            }
          }}
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          redirectUrl="/"
        />
      </div>
    </div>
  )
} 