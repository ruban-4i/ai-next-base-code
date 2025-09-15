import Image from 'next/image';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  bgColor: string;
  textColor: string;
  descColor: string;
}

export function FeatureCard({ title, description, icon, bgColor, textColor, descColor }: FeatureCardProps) {
  return (
    <div className={`relative h-80 w-full rounded-2xl p-8 ${bgColor}`}>
      {/* Icon */}
      <div className="mb-6">
        <Image
          src={icon}
          alt={`${title} icon`}
          width={64}
          height={64}
          className="object-contain"
        />
      </div>

      {/* Title */}
      <h3 className={`mb-4 text-2xl font-semibold ${textColor}`}>
        {title}
      </h3>

      {/* Description */}
      <p className={`text-xl font-medium leading-7 ${descColor}`}>
        {description}
      </p>
    </div>
  );
}
