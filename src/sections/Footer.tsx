import { ArrowUp } from 'lucide-react'
import { meta } from '../content/meta'
import { asset } from '../components/ui'

export function Footer() {
  return (
    <footer className="border-t border-line bg-canvas py-12">
      <div className="container-x flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <img src={asset('assets/brand/dayone-logo.png')} alt="Day One" className="h-16 w-auto self-start md:self-auto" />
        <div className="text-[13px] text-muted md:text-right">
          <p>
            {meta.subject} · {meta.semester}
          </p>
          <p>
            {meta.faculty}, {meta.university}
          </p>
          <p>{meta.authors.map((a) => a.name).join(' & ')}</p>
        </div>
        <a href="#overview" className="group inline-flex items-center gap-2 self-start font-mono text-[12px] uppercase tracking-[0.14em] text-blue md:self-auto">
          <ArrowUp size={14} aria-hidden className="transition-transform duration-200 group-hover:-translate-y-0.5" />
          <span className="link-grow">Back to top</span>
        </a>
      </div>
    </footer>
  )
}
