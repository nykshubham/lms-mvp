'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'
import Link from 'next/link'

export default function Dashboard() {
  const [courses, setCourses] = useState<any[]>([])

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await supabase.from('courses').select('*')
      setCourses(data || [])
    }
    fetchCourses()
  }, [])

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <Link href="/upload" className="text-blue-600 underline">Upload New Course</Link>
      <ul className="mt-6 space-y-4">
        {courses.map(course => (
          <li key={course.id}>{course.title}</li>
        ))}
      </ul>
    </main>
  )
}

