import { Box, Button, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, redirect, useLoaderData } from "@remix-run/react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { tokenCookie } from "../cookies.server";
import {
  NumberInputField,
  NumberInputLabel,
  NumberInputRoot,
} from "../components/ui/number-input";
import { Restaurant } from "~/types/restaurant";

export default function Index() {
  const data = useLoaderData<typeof loader>();
  if (!data) return <>data not found </>;
  const { restaurant } = data;

  return (
    <Box p="24px">
      <Text as="h1" fontWeight={700} fontSize="32px" mb="24px">
        Edit Restaurant
      </Text>
      <Form method="POST">
        <VStack gap="10" width="full" mb="24px">
          <Field label="Name">
            <Input
              name="name"
              autoComplete="true"
              defaultValue={restaurant.name}
            />
          </Field>
          <Field label="Detail">
            <Textarea name="detail" defaultValue={restaurant.detail} />
          </Field>
          <Field label="Price">
            <NumberInputRoot
              name="price"
              defaultValue={String(restaurant.price)}
            >
              <NumberInputLabel />
              <NumberInputField />
            </NumberInputRoot>
          </Field>
          <Field label="Address">
            <Input name="address" defaultValue={restaurant.address} />
          </Field>
        </VStack>
        <input type="hidden" name="image" value={restaurant.image} />
        <Button type="submit">Update</Button>
      </Form>
    </Box>
  );
}

export async function action({ request, params }: ActionFunctionArgs) {
  const id = params.id || "";
  if (!id) throw new Error("Id not found");

  const cookieHeader = request.headers.get("Cookie");

  const [cookie, body] = await Promise.all([
    tokenCookie.parse(cookieHeader),
    request.formData(),
  ]);

  try {
    await fetch("http://localhost:1000/api/restaurants/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie || {}}`,
      },
      body: JSON.stringify({
        id,
        name: body.get("name"),
        detail: body.get("detail"),
        price: body.get("price"),
        address: body.get("address"),
        image: body.get("image"),
      }),
    });

    return redirect("/");
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const id = params.id || "";
  if (!id) throw new Error("Id not found");

  const token = await tokenCookie.parse(request.headers.get("Cookie"));
  if (!token) return redirect("/login");

  try {
    const result = await fetch(`http://localhost:1000/api/restaurants/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const { restaurant }: { restaurant: Restaurant } = await result.json();

    return json({ restaurant });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const meta: MetaFunction = () => {
  return [{ title: "Add Restaurant" }];
};
