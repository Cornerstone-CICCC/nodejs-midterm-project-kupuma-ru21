import { Box, Button, Card, Flex, HStack, Image, Text } from "@chakra-ui/react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, Link, redirect, useLoaderData } from "@remix-run/react";
import { tokenCookie } from "../cookies.server";
import { json } from "@remix-run/node";

export default function Index() {
  const data = useLoaderData<typeof loader>();
  if (!data) return <>data not found</>;

  return (
    <Box p="24px">
      <Text as="h1" fontWeight={700} fontSize="32px" mb="24px">
        Home
      </Text>
      <Flex gap="10px" mb="24px">
        <Button>
          <Link to="/add-restaurant">Add Restaurant</Link>
        </Button>
        <Form method="POST">
          <Button type="submit">Logout</Button>
        </Form>
      </Flex>
      <HStack>
        {data.restaurants.map(({ id, name, detail, price }) => {
          return (
            <Card.Root maxW="sm" overflow="hidden" key={id}>
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt="Green double couch with wooden legs"
              />
              <Card.Body gap="2">
                <Card.Title>{name}</Card.Title>
                <Card.Description>{detail}</Card.Description>
                <Text
                  textStyle="2xl"
                  fontWeight="medium"
                  letterSpacing="tight"
                  mt="2"
                >
                  ${price}
                </Text>
              </Card.Body>
              <Card.Footer gap="2">
                <Button variant="solid">
                  <Link to={id}>Edit</Link>
                </Button>
                <Button variant="ghost">Add to cart</Button>
              </Card.Footer>
            </Card.Root>
          );
        })}
      </HStack>
    </Box>
  );
}

export async function action() {
  return redirect("/login", {
    // REF: https://sergiodxa.com/tutorials/delete-a-cookie-using-remix-cookie-helpers
    headers: { "Set-Cookie": await tokenCookie.serialize("", { maxAge: 1 }) },
  });
}

export async function loader({ request }: LoaderFunctionArgs) {
  const token = await tokenCookie.parse(request.headers.get("Cookie"));
  if (!token) return redirect("/login");

  try {
    const result = await fetch("http://localhost:8080/api/restaurants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const {
      restaurants,
    }: {
      restaurants: {
        id: string;
        name: string;
        detail: string;
        price: number;
      }[];
    } = await result.json();

    return json({ restaurants });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const meta: MetaFunction = () => {
  return [{ title: "Home" }];
};
