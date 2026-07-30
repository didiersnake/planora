import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  let url = '';
  try {
    const body = await req.json();
    url = body.url;
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Follow redirects to find the long URL
    // Since short links might redirect multiple times, let's do a loop or a fetch that follows redirects automatically but lets us inspect the final URL
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    });

    const finalUrl = response.url;
    return NextResponse.json({ resolvedUrl: finalUrl });
  } catch (error) {
    console.error('Error resolving URL:', error);
    return NextResponse.json({ resolvedUrl: url || '', error: 'Could not resolve redirect' });
  }
}
