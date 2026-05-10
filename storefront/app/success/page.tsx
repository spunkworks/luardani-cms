export const metadata = {
  title: 'Order confirmed | Luardani',
}

export default function SuccessPage() {
  return (
    <main className="utility-page">
      <section className="utility-card">
        <a href="/" className="footer__logo">
          <span>LU</span>ARDANI
        </a>
        <h1>Order confirmed</h1>
        <p>Thank you. Stripe has confirmed your checkout session.</p>
        <a href="/" className="btn">
          Return to Luardani
        </a>
      </section>
    </main>
  )
}
