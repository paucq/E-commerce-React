export default function Footer() {
  return (
    <footer className="border-t border-tech-border bg-tech-surface">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 text-center text-sm text-tech-muted sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-tech-muted">
              Tech Pop Store
            </p>
            <h2 className="font-display text-2xl font-semibold text-tech-ink">
              Experiencia digital con actitud.
            </h2>
          </div>
          <p>
            Curamos tecnologia con diseno, soporte real y lanzamientos pensados para
            vos.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-tech-muted">
            Contacto
          </p>
          <div className="space-y-2 text-tech-ink">
            <p>hola@techpop.store</p>
            <p>+54 11 5555 9012</p>
            <p>Av. Futura 1234, CABA</p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-tech-muted">
            Comunidad
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-tech-ink">
            <span className="rounded-full border border-tech-border px-3 py-1">Instagram</span>
            <span className="rounded-full border border-tech-border px-3 py-1">TikTok</span>
            <span className="rounded-full border border-tech-border px-3 py-1">X</span>
            <span className="rounded-full border border-tech-border px-3 py-1">YouTube</span>
          </div>
        </div>
      </div>
      <div className="border-t border-tech-border/70">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-4 px-4 py-5 text-center text-xs uppercase tracking-[0.2em] text-tech-muted">
          <span>© 2026 Tech Pop Store</span>
        </div>
      </div>
    </footer>
  );
}
