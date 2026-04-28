export default function Footer() {
  return (
    <footer className="border-t border-tech-border bg-tech-surface">
      <div className="mx-auto grid w-full max-w-6xl justify-items-center gap-8 px-4 py-12 text-sm text-tech-muted sm:grid-cols-2 lg:grid-cols-3">
        
        {/* Sección 1 */}
        <div className="max-w-sm space-y-4 text-left">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-tech-muted">
              Urban Store
            </p>
            <h2 className="font-display text-2xl font-semibold text-tech-ink">
              Experiencia digital con actitud.
            </h2>
          </div>
          <p>
            Curamos tecnología con diseño, soporte real y lanzamientos pensados para vos.
          </p>
        </div>

        {/* Sección 2 */}
        <div className="max-w-sm space-y-3 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-tech-muted">
            Contacto
          </p>
          <div className="flex flex-col gap-2 text-tech-ink">
            <p>contacta@urbanstore.com</p>
            <p>+57 311 555 9012</p>
            <p>Av. Futura 1234, CABA</p>
          </div>
        </div>

        {/* Sección 3 */}
        <div className="max-w-sm space-y-3 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-tech-muted">
            Comunidad
          </p>
          <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-tech-ink">
            <span className="rounded-full border border-tech-border px-3 py-1">Instagram</span>
            <span className="rounded-full border border-tech-border px-3 py-1">TikTok</span>
            <span className="rounded-full border border-tech-border px-3 py-1">X</span>
            <span className="rounded-full border border-tech-border px-3 py-1">YouTube</span>
          </div>
        </div>

      </div>

      {/* Footer bottom */}
      <div className="border-t border-tech-border/70">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-4 py-5 text-xs uppercase tracking-[0.2em] text-tech-muted">
          <span>© 2026 Urban Store</span>
        </div>
      </div>
    </footer>
  );
}