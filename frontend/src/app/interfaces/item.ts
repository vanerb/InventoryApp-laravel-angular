export interface Item {
  id: string,
  name: string,
  description: string,
  images: {
    "id": number,
    "item_id": number,
    "path": string,
    "from": string,
    "created_at": string,
    "updated_at": string
  }[],
  user_id: number,
  created_at: string,
  updated_at: string,
}

export interface CreateItem{
  name: string,
  description: string,
  cover_image: File,
  gallery_images: File[]
}

export interface UpdateItem{
  id: string,
  name: string,
  description: string,
  cover_image: File,
  gallery_images: File[]
}
