import { Box, Button, HStack, Input, Text } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";

export default function Index() {
  return (
    <Box p="24px">
      <Text as="h1" fontWeight={700} fontSize="32px" mb="24px">
        Sign up
      </Text>
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
              // minLength={8}
            />
          </Field>
        </HStack>
        <Button type="submit">Sign Up</Button>
      </Form>
    </Box>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();

  try {
    await fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: body.get("email"),
        password: body.get("password"),
      }),
    });
    return redirect("/login");
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const meta: MetaFunction = () => {
  return [{ title: "Sign up" }];
};
