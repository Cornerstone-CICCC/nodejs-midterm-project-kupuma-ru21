import { Box, Button, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { tokenCookie } from "../cookies.server";
import {
  NumberInputField,
  NumberInputLabel,
  NumberInputRoot,
} from "../components/ui/number-input";

export default function Index() {
  return (
    <Box p="24px">
      <Text as="h1" fontWeight={700} fontSize="32px" mb="24px">
        Add Restaurant
      </Text>
      <Form method="POST">
        <VStack gap="10" width="full" mb="24px">
          <Field label="Name" required>
            <Input required name="name" autoComplete="true" />
          </Field>
          <Field label="Detail" required>
            <Textarea required name="detail" />
          </Field>
          <Field label="Price" required>
            <NumberInputRoot name="price">
              <NumberInputLabel />
              <NumberInputField />
            </NumberInputRoot>
          </Field>
          <Field label="Address" required>
            <Input required name="address" />
          </Field>
        </VStack>
        <Button type="submit">Add</Button>
      </Form>
    </Box>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");

  const [cookie, body] = await Promise.all([
    tokenCookie.parse(cookieHeader),
    request.formData(),
  ]);

  try {
    const result = await fetch("http://localhost:8080/api/restaurants/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie || {}}`,
      },
      body: JSON.stringify({
        name: body.get("name"),
        detail: body.get("detail"),
        price: body.get("price"),
        address: body.get("address"),
      }),
    });
    const res: { error: string } = await result.json();
    const { error } = res;

    if (error) throw new Error(error);

    return redirect("/");
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const token = await tokenCookie.parse(request.headers.get("Cookie"));
  if (!token) return redirect("/login");
  return null;
}

export const meta: MetaFunction = () => {
  return [{ title: "Add Restaurant" }];
};
