import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || 'AIzaSyBUJn38ODr8aJRn8UTnkni4eQQpAm41xfc';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const input = searchParams.get('input');
  
  if (!input || input.length < 3) {
    return NextResponse.json({ predictions: [] });
  }
  
  try {
    // Google Places Autocomplete API
    const url = new URL('https://maps.googleapis.com/maps/api/place/autocomplete/json');
    url.searchParams.set('input', input);
    url.searchParams.set('types', 'address');
    url.searchParams.set('components', 'country:es');
    url.searchParams.set('location', '40.4168,-3.7038'); // Centro de Madrid
    url.searchParams.set('radius', '60000'); // 60km radio
    url.searchParams.set('language', 'es');
    url.searchParams.set('key', GOOGLE_PLACES_API_KEY);
    
    const response = await fetch(url.toString());
    const data = await response.json();
    
    if (data.status === 'OK') {
      return NextResponse.json(data);
    } else if (data.status === 'ZERO_RESULTS') {
      return NextResponse.json({ predictions: [], status: 'ZERO_RESULTS' });
    } else {
      console.error('Google Places API error:', data.status, data.error_message);
      return NextResponse.json({ 
        predictions: [], 
        status: data.status,
        error: data.error_message 
      });
    }
  } catch (error) {
    console.error('Error fetching from Google Places:', error);
    return NextResponse.json({ predictions: [], error: 'Server error' }, { status: 500 });
  }
}
