import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative px-6 py-16 text-center">
      {/* Main Hero Text */}
      <div className="relative z-10 mb-16">
        <h1 className="mb-4 text-4xl font-medium leading-[65px] text-[#263238] md:text-5xl">
          We're not just building careers
        </h1>
        <h1 className="text-4xl font-medium leading-[65px] text-[#263238] md:text-5xl">
          We're building a{' '}
          <span className="font-semibold text-[#006a9f]">community</span>
        </h1>
      </div>

      {/* Team Illustration */}
      <div className="relative mx-auto mb-16 h-96 w-full max-w-4xl">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <Image
            src="/assets/career/illustrations/background-complete.svg"
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>
        
        {/* Floor */}
        <div className="absolute bottom-0 left-1/2 h-20 w-3/4 -translate-x-1/2">
          <Image
            src="/assets/career/illustrations/floor.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        {/* Speech Bubbles */}
        <div className="absolute left-1/4 top-8 h-32 w-1/3">
          <Image
            src="/assets/career/illustrations/speech-bubbles.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        {/* Characters */}
        <div className="absolute bottom-16 left-1/4 h-48 w-12">
          <Image
            src="/assets/career/illustrations/characters-6.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        <div className="absolute bottom-16 left-1/3 h-48 w-16">
          <Image
            src="/assets/career/illustrations/character-4.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        <div className="absolute bottom-20 left-1/2 h-44 w-20 -translate-x-1/2">
          <Image
            src="/assets/career/illustrations/character-3.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        {/* Desk */}
        <div className="absolute bottom-12 left-1/2 h-32 w-32 -translate-x-1/2">
          <Image
            src="/assets/career/illustrations/desk.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        <div className="absolute bottom-16 left-2/3 h-48 w-16">
          <Image
            src="/assets/career/illustrations/character-5.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        <div className="absolute bottom-16 right-1/4 h-48 w-16">
          <Image
            src="/assets/career/illustrations/character-2.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        <div className="absolute bottom-16 right-1/6 h-48 w-12">
          <Image
            src="/assets/career/illustrations/character-1.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
