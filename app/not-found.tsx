import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section" style={{ paddingTop: "calc(var(--header-h) + var(--section-y))" }}>
      <div className="container" style={{ textAlign: "center", display: "grid", gap: 20, justifyItems: "center" }}>
        <span className="label">404</span>
        <h1 className="display h2">This page is out of balance</h1>
        <Link href="/" className="btn">Back to home</Link>
      </div>
    </main>
  );
}
