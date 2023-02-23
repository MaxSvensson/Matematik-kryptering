import type { ActionArgs } from "@remix-run/node";
import { Link, useActionData } from "@remix-run/react";
import { Form } from "@remix-run/react";
import { decrypt, generateKeys } from "~/server/bank.server";

export async function action({ request }: ActionArgs) {
    const body = await request.formData();

    const message = body.get("message") as unknown as number;

    const { privateKey } = generateKeys();

    const decryptedMessage = decrypt(message, privateKey);

    return decryptedMessage;
}

export default function Index() {
    const message = useActionData();
    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
            <Link to="/">Gå tillbaks</Link>
            <h1>Hackerman😎</h1>
            <Form method="post" reloadDocument>
                <input
                    type="number"
                    name="message"
                    placeholder="Skriv in meddelandet du vill av kryptera"
                />
            </Form>
            <p>{message}</p>
        </div>
    );
}
