'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavLink({ name, id }: { name: string; id: string }) {
  const pathname = usePathname()

  return (
    <>
      <Link
        href={`/${id}`}
        className={clsx({
          'text-blue-600': pathname === `/${id}`,
        })}
      >
        <p className="hidden md:block">{name.slice(0, 20)}</p>
      </Link>
    </>
  )
}
