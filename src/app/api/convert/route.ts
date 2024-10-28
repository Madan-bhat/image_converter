import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const image = formData.get('image') as Blob
    const outputFormat = formData.get('outputFormat') as string

    if (!image || !outputFormat) {
      console.error('Missing image or output format')
      return NextResponse.json({ error: 'Missing image or output format' }, { status: 400 })
    }

    console.log(`Converting image to ${outputFormat}`)

    const buffer = Buffer.from(await image.arrayBuffer())
    let convertedBuffer: Buffer

    switch (outputFormat) {
      case 'png':
        convertedBuffer = await sharp(buffer).png().toBuffer()
        break
      case 'jpeg':
        convertedBuffer = await sharp(buffer).jpeg().toBuffer()
        break
      case 'webp':
        convertedBuffer = await sharp(buffer).webp().toBuffer()
        break
      default:
        console.error(`Invalid output format: ${outputFormat}`)
        return NextResponse.json({ error: 'Invalid output format' }, { status: 400 })
    }

    console.log('Image conversion successful')

    return new NextResponse(convertedBuffer, {
      headers: {
        'Content-Type': `image/${outputFormat}`,
        'Content-Disposition': `attachment; filename="converted.${outputFormat}"`,
      },
    })
  } catch (error) {
    console.error('Conversion error:', error)
    return NextResponse.json({ error: 'Image conversion failed', details: (error as Error).message }, { status: 500 })
  }
}