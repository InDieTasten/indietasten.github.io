import Link from 'next/link'
import clsx from 'clsx'

const variantStyles = {
  primary:
    'font-semibold text-zinc-100 bg-zinc-700 hover:bg-zinc-600 active:bg-zinc-700 active:text-zinc-100/70',
  secondary:
    'font-medium active:bg-zinc-100 active:text-zinc-900/60 bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-50 active:bg-zinc-800/50 active:text-zinc-50/70',
}

type ButtonProps = {
  variant?: keyof typeof variantStyles
} & (
    | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
    | React.ComponentPropsWithoutRef<typeof Link>
  )

export function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  className = clsx(
    'inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none',
    variantStyles[variant],
    className,
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  )
}
