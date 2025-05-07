import { IconEye, IconNonEye } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PASSWORD_TYPE, ROLE_ADMIN, ROLE_EMPLOYEE, TEXT_TYPE } from '@/core/configs/consts'
import { path } from '@/core/constants/path'
import { mutationKeys } from '@/core/helpers/key-tanstack'
import { authApi } from '@/core/services/auth.service'
import { setAccessTokenToLS, setRefreshTokenToLS, setUserToLS } from '@/core/shared/storage'
import { LoginSchema } from '@/core/zod/login.zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { isEqual } from 'lodash'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import Logo from '@/components/landing/Logo'

export const REMEMBER_ME = 'LOCAL_STORAGE_REMEMBER_ME'

export default function Login() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem(REMEMBER_ME) === 'true' ? true : false
  )

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const mutationLogin = useMutation({
    mutationKey: mutationKeys.login,
    mutationFn: data => authApi.login(data)
  })

  function onSubmit() {
    setIsLoading(true)
    const loginData = form.getValues()
    mutationLogin.mutate(loginData, {
      onSuccess: ({ access_token, refresh_token, user }) => {
        setAccessTokenToLS(access_token)
        setRefreshTokenToLS(refresh_token)
        setUserToLS(user)
        navigate(
          isEqual(user.role, ROLE_ADMIN) || isEqual(user.role, ROLE_EMPLOYEE)
            ? path.admin.dashboard
            : path.home
        )
        toast.success('Login success 🚀🚀⚡⚡!')
      },
      onError: () => {
        toast.error('Login failed!')
      },
      onSettled: () => {
        setIsLoading(false)
      }
    })
  }

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible)

  const handleChangeRememberMe = event => {
    setRememberMe(event)
    localStorage.setItem(REMEMBER_ME, JSON.stringify(event))
  }

  useEffect(() => {
    if (rememberMe) {
      const email = localStorage.getItem('email')
      if (email) {
        form.setValue('email', email)
      }
    }
  }, [form, rememberMe])

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Side - Form */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center flex-1 px-4 sm:px-6 lg:px-8"
      >
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Logo className="mx-auto mb-8" />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl font-bold text-gray-900"
            >
              Chào mừng trở lại!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-2 text-sm text-gray-600"
            >
              Đăng nhập để tiếp tục với Hire Nova
            </motion.p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập email của bạn"
                          type="email"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập mật khẩu của bạn"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          type={isPasswordVisible ? TEXT_TYPE : PASSWORD_TYPE}
                          {...field}
                          icon={isPasswordVisible ? <IconNonEye /> : <IconEye />}
                          iconOnClick={togglePasswordVisibility}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox
                    id="remember"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    onChange={e => handleChangeRememberMe(e.target.checked)}
                    checked={rememberMe}
                  />
                  <Label htmlFor="remember" className="ml-2 text-sm text-gray-600 cursor-pointer">
                    Ghi nhớ đăng nhập
                  </Label>
                </div>

                <Link
                  to={path.forgotPassword}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              <Button
                loading={isLoading}
                className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                type="submit"
              >
                Đăng nhập
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Chưa có tài khoản?{' '}
                  <Link
                    to={path.register}
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Đăng ký ngay
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </motion.div>

      {/* Right Side - Image */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:block lg:w-1/2"
      >
        <div className="relative h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-400/20" />
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="Login"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-lg p-8 text-center text-white">
              <h2 className="mb-4 text-4xl font-bold">Tìm Kiếm Nhân Tài Thông Minh</h2>
              <p className="text-lg">
                Sử dụng AI để sàng lọc CV và tìm kiếm ứng viên phù hợp nhất cho doanh nghiệp của bạn
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
