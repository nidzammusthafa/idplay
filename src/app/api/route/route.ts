import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const startLon = searchParams.get("startLon");
  const startLat = searchParams.get("startLat");
  const endLon = searchParams.get("endLon");
  const endLat = searchParams.get("endLat");

  if (!startLon || !startLat || !endLon || !endLat) {
    return NextResponse.json(
      { error: "Missing start or end coordinates" },
      { status: 400 }
    );
  }

  const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${startLon},${startLat};${endLon},${endLat}?overview=false`;

  try {
    const response = await fetch(osrmUrl, {
      headers: {
        "User-Agent": "IDPlay-Coverage-Checker/1.0",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OSRM API failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();

    if (data.code !== "Ok" || !data.routes || data.routes.length === 0) {
        return NextResponse.json({ distance: null, error: "No route found" });
    }

    // Return just the distance from the first route
    return NextResponse.json({ distance: data.routes[0].distance });

  } catch (error) {
    console.error("Error fetching from OSRM:", error);
    return NextResponse.json(
      {
        error: `Failed to get route data: ${
          error instanceof Error ? error.message : String(error)
        }`,
      },
      { status: 500 }
    );
  }
}
