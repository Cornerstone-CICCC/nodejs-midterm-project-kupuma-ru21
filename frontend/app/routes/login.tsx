import { Box, Button, HStack, Input, Text } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, Link, redirect } from "@remix-run/react";
import { tokenCookie } from "~/cookies.server";

export default function Index() {
  return (
    <Box p="24px">
      <Text as="h1" fontWeight={700} fontSize="32px" mb="24px">
        Login
      </Text>
      <Box mb="24px">
        <Form method="POST">
          <HStack gap="10" width="full" mb="24px">
            <Field label="Email" required>
              <Input
                type="email"
                required
                name="email"
                autoComplete="true"
                placeholder="example@email.com"
              />
            </Field>
            <Field label="Password" required>
              <Input
                type="password"
                required
                name="password"
                autoComplete="true"
                minLength={8}
              />
            </Field>
          </HStack>
          <Button type="submit">Login</Button>
        </Form>
      </Box>
      <Button>
        <Link to="/sign-up">Sign up</Link>
      </Button>
    </Box>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();

  try {
    const result = await fetch("http://localhost:1000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: body.get("email"),
        password: body.get("password"),
      }),
    });

    const res: { error: string; token: string } = await result.json();
    const { error, token } = res;

    if (error) throw new Error(error);

    return redirect("/", {
      headers: { "Set-Cookie": await tokenCookie.serialize(token) },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const meta: MetaFunction = () => {
  return [{ title: "Login" }];
};
