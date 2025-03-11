import { Field } from "@/components/ui/field"
import { PasswordInput } from "@/components/ui/password-input"
import { Button, Input, Stack } from "@chakra-ui/react"
import { useForm } from "react-hook-form"

const ManualLogin = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    
    const onSubmit = handleSubmit((data) => console.log(data))
    return <>
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start" maxW="sm">
        <Field
          label="Username"
          invalid={!!errors.username}
          errorText={errors.username?.message}
        >
          <Input
            {...register("username", { required: "Username is required" })}
          />
        </Field>

        <Field
          label="Password"
          invalid={!!errors.password}
          errorText={errors.password?.message}
        >
          <PasswordInput
            {...register("password", { required: "Password is required" })}
          />
        </Field>

        <Button type="submit">Submit</Button>
      </Stack>
    </form>
    
    </>
}

export default ManualLogin