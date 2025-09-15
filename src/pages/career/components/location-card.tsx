import Image from 'next/image';

interface LocationCardProps {
  country: string;
  icon: string;
  address: string;
  city: string;
  phone: string;
}

export function LocationCard({ country, icon, address, city, phone }: LocationCardProps) {
  return (
    <div className="flex h-[360px] w-52 flex-shrink-0 flex-col items-center gap-4 rounded-lg bg-[#fbfbfb] p-5">
      {/* Icon */}
      <div className="flex h-24 w-24 items-center justify-center">
        <Image
          src={icon}
          alt={`${country} landmark`}
          width={100}
          height={100}
          className="object-contain"
        />
      </div>

      {/* Country */}
      <h3 className="text-2xl font-bold text-black">
        {country}
      </h3>

      {/* Address */}
      <p className="text-center text-sm font-medium text-[#585858] leading-normal">
        {address}
      </p>

      {/* City */}
      <p className="text-center text-sm font-medium text-[#585858] leading-normal">
        {city}
      </p>

      {/* Phone */}
      <p className="text-center text-sm font-medium text-[#585858] leading-normal">
        {phone}
      </p>
    </div>
  );
}
