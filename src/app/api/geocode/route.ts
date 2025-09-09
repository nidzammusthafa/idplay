import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "Latitude and longitude are required" },
      { status: 400 }
    );
  }

  try {
    const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&addressdetails=1`;
    const response = await fetch(nominatimUrl, {
      headers: {
        "User-Agent": "IDPlay-Coverage-Checker/1.0 (contact@example.com)",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Nominatim API failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();

    // Return the full address object and display_name
    return NextResponse.json({ address: data.address, displayName: data.display_name });

  } catch (error) {
    console.error("Error fetching from Nominatim:", error);
    return NextResponse.json(
      {
        error: `Failed to get address data: ${
          error instanceof Error ? error.message : String(error)
        }`,
      },
      { status: 500 }
    );
  }
}
