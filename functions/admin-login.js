export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: "BAD_JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const input = (body && body.password) ? String(body.password) : "";

  if (!input) {
    return new Response(JSON.stringify({ ok: false, error: "NO_PASSWORD" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const real = env.ADMIN_PASSWORD || "";

  if (!real) {
    return new Response(JSON.stringify({ ok: false, error: "SERVER_PASSWORD_NOT_SET" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (input === real) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: false, error: "WRONG_PASSWORD" }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
}
