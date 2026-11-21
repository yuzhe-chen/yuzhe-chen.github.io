/**
 * A plain <img>. next/image would serve a single size with no srcset on a
 * static export, so it is not used.
 */
export function Img({
  src,
  alt,
  width,
  height,
  className,
  loading = "lazy",
  fetchPriority,
  sizes,
  srcSet,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string;
  srcSet?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      className={className}
    />
  );
}
