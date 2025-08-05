'use client'
import { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'
import { useParams } from 'next/navigation'

export default function WatchPage() {
  const { id } = useParams()
  const [course, setCourse] = useState<any>(null)

  useEffect(() => {
    const fetchCourse = async () => {
      const { data } = await supabase.from('courses').select('*').eq('id', id).single()
      setCourse(data)
    }
    fetchCourse()
  }, [id])

  if (!course) return <p>Loading...</p>

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
      <p className="mb-4">{course.description}</p>
      <video className="w-full" controls>
        <source src={course.video_url} type="video/mp4" />
      </video>
    </div>
  )
}

