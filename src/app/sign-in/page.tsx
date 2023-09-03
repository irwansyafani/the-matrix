"use client"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export interface SignInProps {
  email: string
  password: string
}

const schema = yup
  .object({
    email: yup
      .string()
      .email("Please provide a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required()

export default function SignInPage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: SignInProps) => {
    const res = await signIn("credentials", {
      redirect: false,
      username: data.email,
      password: data.password,
      callbackUrl: `${window.location.origin}/`,
    })

    if (res?.error) {
      alert(res.error)
    }

    if (res?.url) router.push(res.url)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-black">
      <div className="w-[500px] bg-white rounded-lg p-6">
        <h3 className="text-center text-2xl font-semibold mb-5">
          Login Your Account
        </h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="border w-full rounded-md p-3"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="border w-full rounded-md p-3"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-gray-100 w-full p-3 rounded-md hover:bg-gray-200 transition-colors duration-200"
              disabled={isSubmitting || isLoading}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
