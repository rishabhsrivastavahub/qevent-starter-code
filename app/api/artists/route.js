export async function GET() {
  try {
    const response = await fetch('https://qevent-backend.labs.crio.do/artists');
    if (!response.ok) {
      throw new Error('Failed to fetch artists from backend');
    }
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error fetching artists:', error);
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
