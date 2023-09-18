import Image, { StaticImageData } from 'next/image'

interface CategoryCardProps {
  title: string
  description: string
  imgUrl: StaticImageData
}

export function CategoryCard({
  description,
  imgUrl,
  title,
}: CategoryCardProps) {
  return (
    <div className="flex border">
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
        <button>SHOP NOW</button>
      </div>
      <Image src={imgUrl} alt={`Category ${title}`} width={200} />
    </div>
  )
}
