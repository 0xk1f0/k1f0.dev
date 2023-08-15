let encoder = new TextEncoder();

// hash ip so we can remember the vote per IP without actually storing it
export async function hashClientAddress(address: string) {
    const BYTES = new Uint8Array(
        await crypto.subtle.digest('SHA-512', encoder.encode(address))
    );
    return btoa(String.fromCharCode(...BYTES))
}