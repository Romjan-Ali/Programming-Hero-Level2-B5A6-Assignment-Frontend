import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import {
  useChangePasswordMutation,
  useSendOtpMutation,
  useUserInfoQuery,
  useVerifyOtpMutation,
} from '@/redux/features/auth/auth.api'
import { useUpdateUserMutation } from '@/redux/features/user/user.api'

const AgentSettings = () => {
  const { data: userInfo } = useUserInfoQuery(undefined)

  const [name, setName] = useState(userInfo?.data?.name || '')
  const [email, setEmail] = useState(userInfo?.data?.email || '')
  const [emailVerificationCode, setEmailVerifacationCode] = useState('')
  const [phone, setPhone] = useState(userInfo?.data?.phone || '')


  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [isChangedEmailInput, setIsChangedEmailInput] = useState(false)
  const [isDisplayVerificationCodeInput, setIsDisplayVerificationCodeInput] =
    useState(false)
  const [updateUser] = useUpdateUserMutation()

  const [isOtpSent, setIsOtpSent] = useState(false)
  const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation()
  const [timer, setTimer] = useState(300)
  const [verifyOtp] = useVerifyOtpMutation()

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [isDisplayPasswordInput, setIsDisplayPasswordInput] = useState(false)
  const [changePassword] = useChangePasswordMutation()

  useEffect(() => {
    if (
      userInfo?.data?.email &&
      userInfo?.data?.email !== '' &&
      userInfo?.data?.email !== email
    ) {
      setIsChangedEmailInput(true)
      setIsEmailVerified(false)
      setIsOtpSent(false)
    } else {
      setIsChangedEmailInput(false)
      setIsDisplayVerificationCodeInput(false)
    }
  }, [email, userInfo?.data?.email])

  const handleClickChangeEmail = async () => {
    setIsDisplayVerificationCodeInput(true)

    // handle click cancel
    if (isDisplayVerificationCodeInput) {
      setEmail(userInfo?.data?.email)
    } else {
      await handleSendOtp()
    }
  }

  const handleSendOtp = async () => {
    const toastId = toast.loading('Sending OTP')

    try {
      console.log('send otp')
      const res = await sendOtp({ email, name }).unwrap()

      console.log('response', res)

      if (res.success) {
        toast.success('OTP Sent', { id: toastId })
        setIsOtpSent(true)
        setTimer(300)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err)
      toast.error(err?.data?.message, { id: toastId })
    }
  }

  useEffect(() => {
    if (!email || !isOtpSent) {
      return
    }

    const timerId = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timerId)
  }, [email, isOtpSent])

  const handleOtpSubmit = async () => {
    const toastId = toast.loading('Verifying OTP')

    try {
      console.log('send otp')
      const res = await verifyOtp({
        email,
        otp: emailVerificationCode,
      }).unwrap()

      console.log('response', res)

      if (res.success) {
        toast.success('Email verified', { id: toastId })
        setIsEmailVerified(true)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err)
      toast.error(err?.data?.message, { id: toastId })
    }
  }

  const handlePasswordSubmit = async () => {
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      toast.error('Please fill up all required fields related with password')
      return
    }
    if (oldPassword === (newPassword || confirmNewPassword)) {
      toast.error('New password matched with old password')
      return
    }
    if (newPassword !== confirmNewPassword) {
      toast.error("New password didn't match with confirm new password")
      return
    }

    const toastId = toast.loading('Changing Password')

    try {
      console.log('change password')
      const res = await changePassword({
        oldPassword,
        newPassword,
      }).unwrap()

      console.log('response', res)

      if (res.success) {
        toast.success('Password changed successfully', { id: toastId })
        setIsDisplayPasswordInput(false)
        setOldPassword('')
        setNewPassword('')
        setConfirmNewPassword('')
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'data' in err) {
        const error = err as { data?: { message?: string } }
        toast.error(error.data?.message, { id: toastId })
      } else {
        console.error(err)
        toast.error('Something went wrong', { id: toastId })
      }
    }
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isChangedEmailInput && !isEmailVerified) {
      toast.error('Email is not verified')
      return
    }
    if (
      isDisplayPasswordInput &&
      (oldPassword || newPassword || confirmNewPassword)
    ) {
      toast.error('Change password first or cancel')
      return
    }
    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords didn't match")
      return
    }

    console.log('handle update')

    const toastId = toast.loading('Updating Profile')

    try {
      console.log('edit profile')
      const res = await updateUser({
        name: name || undefined,
        email: email || undefined,
        phone: phone || undefined
      }).unwrap()

      console.log('response', res)

      if (res.success) {
        toast.success('Profile updated successfully', { id: toastId })        
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'data' in err) {
        const error = err as { data?: { message?: string } }
        toast.error(error.data?.message, { id: toastId })
      } else {
        console.error(err)
        toast.error('Something went wrong', { id: toastId })
      }
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Profile Settings</CardTitle>
      </CardHeader>
      <form onSubmit={handleUpdate}>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-medium">
              Name
            </label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <div className="flex gap-4">
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {isChangedEmailInput && !isEmailVerified && (
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={handleClickChangeEmail}
                >
                  {isDisplayVerificationCodeInput ? 'Cancel' : 'Change'}
                </Button>
              )}
            </div>
          </div>

          {isDisplayVerificationCodeInput && !isEmailVerified && (
            <div className="flex flex-col gap-2">
              <label htmlFor="emailVerificationCode" className="font-medium">
                Email Verification Code
              </label>
              <div className="flex gap-4">
                <Input
                  id="emailVerificationCode"
                  placeholder="Enter your verification code"
                  value={emailVerificationCode}
                  onChange={(e) => setEmailVerifacationCode(e.target.value)}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={handleOtpSubmit}
                >
                  Verify
                </Button>
              </div>

              <p className="text-sm text-gray-400">
                We sent six digit verification code. Check your email.
              </p>
              <p className="text-sm text-gray-400">
                {timer === 0 ? (
                  <Button
                    variant="link"
                    onClick={handleSendOtp}
                    disabled={isSendingOtp}
                  >
                    Resend OTP
                  </Button>
                ) : (
                  `Can't get email? You can retry after ${timer}s`
                )}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="font-medium">
              Phone
            </label>
            <Input
              id="phone"
              placeholder="Enter your phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-medium">
              Password
            </label>
          </div>

          {isDisplayPasswordInput && (
            <Card className="px-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="oldPassword" className="font-medium">
                  Old Password
                </label>
                <Input
                  id="oldPassword"
                  type="password"
                  placeholder="Enter old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="newPassword" className="font-medium">
                  New Password
                </label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="newPasswordConfirmation"
                  className="font-medium"
                >
                  Confirm New Password
                </label>
                <Input
                  id="newPasswordConfirmation"
                  type="password"
                  placeholder="Enter new password again"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>

              <div className="flex w-full gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => setIsDisplayPasswordInput((prev) => !prev)}
                >
                  {isDisplayPasswordInput ? 'Cancel' : 'Change Password'}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={handlePasswordSubmit}
                >
                  Change Password
                </Button>
              </div>
            </Card>
          )}

          {!isDisplayPasswordInput && (
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={() => setIsDisplayPasswordInput((prev) => !prev)}
            >
              Change Password
            </Button>
          )}

          <Button
            type="submit"
            className="mt-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white cursor-pointer"
          >
            Update Profile
          </Button>
        </CardContent>
      </form>
    </Card>
  )
}

export default AgentSettings
