'use client'
import { useState } from 'react'
import supabase from '@/lib/supabase'

export default function UploadPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [video, setVideo] = useState<File | null>(null)

  const handleUpload = async () => {
    if (!video) return

    const filePath = `videos/${Date.now()}-${video.name}`
    const { data: storageData, error: storageError } = await supabase.storage.from('videos').upload(filePath, video)
    if (storageError) return alert(storageError.message)

    const video_url = supabase.storage.from('videos').getPublicUrl(filePath).data.publicUrl
    await supabase.from('courses').insert({ title, description, video_url })
    window.location.href = '/dashboard'
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Upload New Course</h1>
      <input className="w-full p-2 mb-2 border" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea className="w-full p-2 mb-2 border" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <input type="file" onChange={e => setVideo(e.target.files?.[0] || null)} />
      <button onClick={handleUpload} className="bg-blue-600 text-white px-4 py-2 mt-4">Upload</button>
    </div>
  )
}

