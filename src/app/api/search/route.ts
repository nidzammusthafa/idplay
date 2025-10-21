import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json(
      { error: "Search query is required" },
      { status: 400 }
    );
  }

  try {
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      query
    )}&limit=1`; // limit=1 to get the most relevant result
    const response = await fetch(nominatimUrl, {
      headers: {
        "User-Agent": "IDPlay-Coverage-Checker/1.0 (contact@example.com)", // IMPORTANT: Replace with your actual application name and contact
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Nominatim API failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();

    if (data.length === 0) {
      return NextResponse.json(
        { error: "Location not found" },
        { status: 404 }
      );
    }

    const { lat, lon, display_name } = data[0];
    return NextResponse.json({
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      name: display_name,
    });
  } catch (error) {
    console.error("Error fetching from Nominatim:", error);
    return NextResponse.json(
      {
        error: `Failed to get geocoding data: ${
          error instanceof Error ? error.message : String(error)
        }`,
      },
      { status: 500 }
    );
  }
}
