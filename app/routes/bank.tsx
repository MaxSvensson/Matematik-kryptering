import type { ActionArgs } from "@remix-run/node";
import { Link, useActionData } from "@remix-run/react";
import { Form } from "@remix-run/react";
import { encrypt, generateKeys } from "~/server/bank.server";

export async function action({ request }: ActionArgs) {
    console.log("message");
    const body = await request.formData();

    const message = body.get("message") as unknown as number;

    const { publicKey } = generateKeys();

    const encryptedMessage = encrypt(message, publicKey);

    return encryptedMessage;
}

export default function Index() {
    const message = useActionData();
    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
            <Link to="/">Gå tillbaks</Link>
            <h1>Bank</h1>
            <Form method="post" reloadDocument>
                <input
                    type="number"
                    name="message"
                    placeholder="Skriv in meddelandet du vill kryptera"
                />
            </Form>
            <p>{message}</p>
        </div>
    );
}
