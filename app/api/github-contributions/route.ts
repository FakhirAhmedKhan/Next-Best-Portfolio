import { NextResponse } from "next/server";

const GITHUB_USERNAME = "FakhirAhmedKhan";

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) throw new Error("Missing GitHub token in environment variables");

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
      body: JSON.stringify({ query }),
    });

    const { data, errors } = await res.json();
    if (errors) throw new Error(errors[0].message);

    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Failed to fetch data" }, { status: 500 });
  }
}
