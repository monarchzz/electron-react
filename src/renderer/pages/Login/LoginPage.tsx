import {
  TextInput,
  Button,
  Container,
  Title,
  Text,
  Anchor,
  PasswordInput,
  Paper,
} from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { useCallback, useState } from 'react';
import { GraphqlErrorCodes } from 'renderer/constants/graphql';
import { useAuth } from 'renderer/services/context/auth/AuthProvider';
import useLogin from 'renderer/services/graphql/mutations/auth/useLogin';
import { errorExists } from 'renderer/services/graphql/queries/error';

function LoginPage() {
  const form = useForm({
    initialValues: {
      organization: '',
      username: '',
      password: '',
    },
    validate: {
      organization: hasLength(
        { min: 3, max: 20 },
        "Organization can't be shorter than 3 and longer than 20 characters"
      ),
      username: hasLength(
        { min: 3, max: 20 },
        "Username can't be shorter than 3 and longer than 20 characters"
      ),
      password: hasLength(
        { min: 6, max: 40 },
        "Password can't be shorter than 6 and longer than 40 characters"
      ),
    },
  });
  type FormValues = typeof form.values;
  const { login } = useLogin();
  const [errorMessage, setErrorMessage] = useState<string>();
  const auth = useAuth();

  const onSubmit = useCallback(
    (values: FormValues) => {
      setErrorMessage(undefined);
      login(
        {
          input: {
            username: values.username,
            password: values.password,
          },
        },
        values.organization
      ).then((result) => {
        if (
          errorExists(result.error, GraphqlErrorCodes.invalidCredentials) ||
          errorExists(result.error, undefined)
        ) {
          setErrorMessage('Organization, username or password is incorrect');
        }

        if (result.data) {
          auth.login(result.data.login);
        }

        return result;
      });
    },
    [auth, login]
  );

  return (
    <Container size={420} my={40}>
      <Title align="center">Welcome back!</Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            label="Organization"
            placeholder="Your organization"
            required
            {...form.getInputProps('organization')}
          />
          <TextInput
            label="Username"
            placeholder="Your username"
            required
            mt="md"
            {...form.getInputProps('username')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            // required
            mt="md"
            {...form.getInputProps('password')}
          />
          <Text color="red" mt="sm" fz="sm">
            {errorMessage}
          </Text>
          <Button fullWidth mt="md" type="submit">
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default LoginPage;
