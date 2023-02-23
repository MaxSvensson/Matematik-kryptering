import { Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { generateKeys } from "~/server/bank.server";

export async function loader() {
    return generateKeys();
}

export default function Index() {
    const [showPrivate, setShowPrivate] = useState(false);

    const keys = useLoaderData();

    console.log(keys);

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
            <h1>Kryptering</h1>
            <Link to="/bank">Bank</Link>
            <br />
            <Link to="/hackerman">Hackerman</Link>

            <h3>Nycklar</h3>
            <p>Publik key: {keys.publicKey}</p>
            <button onClick={() => setShowPrivate(!showPrivate)}>
                Visa privat nyckel
            </button>
            <p>
                Privat key:{" "}
                <span
                    style={{
                        color: !showPrivate ? "transparent" : "black",
                        textShadow: !showPrivate ? "0 0 8px #000" : "none",
                    }}>
                    {keys.privateKey}
                </span>
            </p>
        </div>
    );
}
