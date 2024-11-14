import { Box, Button, Card, Flex, HStack, Image, Text } from "@chakra-ui/react";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import {
  Form,
  Link,
  redirect,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import { tokenCookie } from "../cookies.server";
import { json } from "@remix-run/node";
import { Restaurant } from "~/types/restaurant";

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

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
        <Form method="POST" action="logout">
          <Button type="submit">Logout</Button>
        </Form>
      </Flex>
      <HStack>
        {data.restaurants?.map(
          ({ id, name, detail, price, address, image }) => {
            return (
              <Card.Root maxW="sm" overflow="hidden" key={id}>
                <Image src={image} alt="Green double couch with wooden legs" />
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
                  <Text fontWeight="medium" letterSpacing="tight" mt="2">
                    <a
                      href={`https://www.google.co.jp/maps/place/${address}`}
                      target="__blank"
                      rel="noopener noreferrer"
                    >
                      {address}
                    </a>
                  </Text>
                </Card.Body>
                <Card.Footer gap="2">
                  <Button variant="solid">
                    <Link to={id}>Edit</Link>
                  </Button>
                  <fetcher.Form method="POST">
                    <Button type="submit" variant="ghost">
                      Delete
                    </Button>
                    <input type="hidden" name="id" value={id} />
                  </fetcher.Form>
                </Card.Footer>
              </Card.Root>
            );
          }
        )}
      </HStack>
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
    await fetch("http://localhost:1000/api/restaurants/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`,
      },
      body: JSON.stringify({ id: body.get("id") }),
    });

    return redirect("/");
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const token = await tokenCookie.parse(request.headers.get("Cookie"));
  if (!token) return redirect("/login");

  try {
    const result = await fetch("http://localhost:1000/api/restaurants", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const { restaurants }: { restaurants: Restaurant[] } = await result.json();

    return json({ restaurants });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const meta: MetaFunction = () => {
  return [{ title: "Home" }];
};
