import { NextResponse } from "next/server";

const GITHUB_USERNAME = "FakhirAhmedKhan";
export const revalidate = 60 * 60 * 6; // cache for 6 hours

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) throw new Error("Missing GITHUB_TOKEN in environment variables");

    const query = `
      query {
        user(login: "${GITHUB_USERNAME}") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  color
                }
              }
            }
          }
        }
      }`;

    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // allow Next to cache the upstream response according to revalidate
      next: { revalidate },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`GitHub API error ${res.status}: ${text}`);
    }

    const { data, errors } = await res.json();
    if (errors?.length) throw new Error(errors[0].message);

    return NextResponse.json({ data }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch data";
    console.error("github-contributions error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
