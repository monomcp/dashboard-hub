// Instagram glyph with the official brand gradient.

type Props = {
  className?: string;
  /** Optional single-color override; defaults to the Instagram gradient. */
  color?: string;
};

// Unique gradient id per import — kept stable so multiple renders share the
// same <defs>. If used many times on the same page, the browser deduplicates.
const GRADIENT_ID = "instagram-brand-gradient";

export function InstagramIcon({ className, color }: Props) {
  return (
    <svg
      viewBox="-1 -1 26 26"
      role="img"
      aria-label="Instagram"
      className={className}
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
    >
      {!color && (
        <defs>
          <radialGradient
            id={GRADIENT_ID}
            cx="30%"
            cy="107%"
            r="150%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#FDF497" />
            <stop offset="0.05" stopColor="#FDF497" />
            <stop offset="0.45" stopColor="#FD5949" />
            <stop offset="0.6" stopColor="#D6249F" />
            <stop offset="0.9" stopColor="#285AEB" />
          </radialGradient>
        </defs>
      )}
      <path
        fill={color ?? `url(#${GRADIENT_ID})`}
        d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.265.058-1.644.07-4.849.07-3.204 0-3.584-.012-4.849-.07-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.849c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.775.13 4.602.402 3.635 1.37 2.668 2.337 2.396 3.51 2.338 4.788 2.28 6.068 2.266 6.477 2.266 12s.014 5.932.072 7.212c.058 1.278.33 2.451 1.297 3.418.967.967 2.14 1.239 3.418 1.297C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.278-.058 2.451-.33 3.418-1.297.967-.967 1.239-2.14 1.297-3.418.058-1.28.072-1.689.072-7.212 0-5.523-.014-5.932-.072-7.212-.058-1.278-.33-2.451-1.297-3.418C19.399.402 18.226.13 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
      />
    </svg>
  );
}
