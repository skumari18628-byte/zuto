export default function Logo({ size = 'lg', animated = false }) {
  if (size === 'sm') {
    return <div className="topbar-mark">Z</div>
  }
  return (
    <div className={`zuto-mark ${animated ? 'zuto-mark--anim' : ''}`}>Z</div>
  )
}