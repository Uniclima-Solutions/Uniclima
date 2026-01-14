import { NextRequest, NextResponse } from 'next/server'

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY || ''

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const placeId = searchParams.get('placeId')

    if (!placeId) {
      return NextResponse.json(
        { error: 'Place ID is required' },
        { status: 400 }
      )
    }

    const fields = [
      'name',
      'formatted_address',
      'formatted_phone_number',
      'international_phone_number',
      'website',
      'url',
      'rating',
      'user_ratings_total',
      'reviews',
      'opening_hours',
      'photos',
      'geometry',
      'types',
      'business_status',
    ].join(',')

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${GOOGLE_PLACES_API_KEY}&language=es`
    )

    const data = await response.json()

    if (data.status !== 'OK') {
      return NextResponse.json(
        { error: data.error_message || 'Error fetching place details' },
        { status: 400 }
      )
    }

    return NextResponse.json(data.result)
  } catch (error) {
    console.error('Google Places error:', error)
    return NextResponse.json(
      { error: 'Error fetching place details' },
      { status: 500 }
    )
  }
}
