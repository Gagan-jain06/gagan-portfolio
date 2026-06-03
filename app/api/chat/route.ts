export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-lite",
          messages: [
            {
              role: "user",
              content: body.question,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    return Response.json({
      answer:
        data?.choices?.[0]?.message?.content ||
        JSON.stringify(data),
    });

  } catch (error: any) {
    return Response.json({
      answer: `ERROR: ${error.message}`,
    });
  }
}