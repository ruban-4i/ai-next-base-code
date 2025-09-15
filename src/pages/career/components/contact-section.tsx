export function ContactSection() {
  return (
    <section className="bg-[#fff9f1] px-6 py-16">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="mb-8 text-4xl font-medium text-[#263238]">Contact Us</h2>
        <div className="text-xl font-medium leading-10 text-[#4f4f4f]">
          <p className="mb-2">
            If you have any questions about career opportunities, please contact our Talent Hiring Team and you can mail them in
          </p>
          <p>
            <a
              href="mailto:Recruitment@4iapps.com"
              className="text-[#5b5fc7] underline decoration-solid transition-colors hover:text-blue-600"
            >
              Recruitment@4iapps.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
