import { cn } from '../../utils/cn';

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn('animate-pulse rounded bg-muted', className)}
      {...props}
    />
  );
}

export { Skeleton };
