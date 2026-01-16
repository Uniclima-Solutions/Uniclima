import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || 'AIzaSyBUJn38ODr8aJRn8UTnkni4eQQpAm41xfc';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const placeId = searchParams.get('place_id');
  
  if (!placeId) {
    return NextResponse.json({ error: 'place_id is required' }, { status: 400 });
  }
  
  try {
    // Google Places Details API
    const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
    url.searchParams.set('place_id', placeId);
    url.searchParams.set('fields', 'address_components,formatted_address,geometry');
    url.searchParams.set('language', 'es');
    url.searchParams.set('key', GOOGLE_PLACES_API_KEY);
    
    const response = await fetch(url.toString());
    const data = await response.json();
    
    if (data.status === 'OK' && data.result) {
      const components = data.result.address_components || [];
      
      let codigoPostal = '';
      let poblacion = '';
      let provincia = '';
      let calle = '';
      let numero = '';
      
      for (const comp of components) {
        const types = comp.types || [];
        
        if (types.includes('postal_code')) {
          codigoPostal = comp.long_name;
        }
        if (types.includes('locality')) {
          poblacion = comp.long_name;
        }
        if (types.includes('administrative_area_level_2')) {
          provincia = comp.long_name;
        }
        if (types.includes('route')) {
          calle = comp.long_name;
        }
        if (types.includes('street_number')) {
          numero = comp.long_name;
        }
      }
      
      return NextResponse.json({
        status: 'OK',
        result: {
          codigoPostal,
          poblacion,
          provincia: provincia || 'Madrid',
          calle,
          numero,
          formatted_address: data.result.formatted_address
        }
      });
    } else {
      console.error('Google Places Details error:', data.status, data.error_message);
      return NextResponse.json({ 
        status: data.status,
        error: data.error_message 
      });
    }
  } catch (error) {
    console.error('Error fetching place details:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
