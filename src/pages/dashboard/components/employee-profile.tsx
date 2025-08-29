'use client';

export function EmployeeProfile() {
  return (
    <div className="flex w-full items-start gap-10">
      {/* Left Column */}
      <div className="flex flex-1 flex-col gap-6">
        {/* Personal Details Card */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-[0px_1px_2px_0px_rgba(145,158,171,0.16)]">
          <div className="p-6">
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-[#1c252e] text-[18px] leading-[28px]">
                Personal Details
              </h3>

              <div className="flex flex-col gap-4">
                {/* Avatar and Basic Info */}
                <div className="flex items-start gap-3">
                  <div className="relative flex h-[100px] w-[100px] items-center justify-center rounded-full border border-[rgba(145,158,171,0.2)] border-dashed">
                    <div className="h-16 w-16 overflow-hidden rounded-full">
                      <img
                        alt="Abdul Rahman"
                        className="h-full w-full object-cover"
                        src="/api/placeholder/64/64"
                      />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-1">
                    <div className="font-semibold text-[#1c252e] text-[16px] leading-[24px]">
                      Abdul Rahman
                    </div>
                    <div className="font-semibold text-[#637381] text-[14px] leading-[22px]">
                      34834
                    </div>
                    <div className="font-semibold text-[#1c252e] text-[14px] leading-[22px]">
                      Product Developer
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-[rgba(145,158,171,0.2)]" />

                {/* Personal Details List */}
                <div className="flex flex-col gap-2">
                  <DetailRow label="Gender" value="Male" />
                  <DetailRow label="Blood Group" value="O+" />
                  <DetailRow label="Date of Birth" value="12/12/1998" />
                  <DetailRow label="Nationality" value="Omani" />
                  <DetailRow label="Education" value="Masters Degree" />
                  <DetailRow label="Religion" value="Muslim" />
                  <DetailRow label="Marital Status" value="Unmarried" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dependent Details Card */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-[0px_1px_2px_0px_rgba(145,158,171,0.16)]">
          <div className="p-6">
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-[#1c252e] text-[18px] leading-[28px]">
                Dependent Details
              </h3>

              <div className="flex flex-col gap-2">
                <DetailRow label="Name" value="Naseer" />
                <DetailRow label="Relationship" value="Father" />
                <DetailRow label="Date of Birth" value="12/12/1975" />
                <DetailRow label="Email" value="Naseerase@hotmail.com" />
                <DetailRow label="Education" value="Masters Degree" />
                <DetailRow label="Contact" value="6183439443" />

                <div className="flex flex-wrap items-start gap-2">
                  <div className="w-60 min-w-60 font-normal text-[#1c252e] text-[14px] leading-[22px]">
                    Benefits Coverage
                  </div>
                  <div className="flex flex-wrap items-start gap-4">
                    <Badge text="Education Allowance" />
                    <Badge text="Travel Allowance" />
                    <Badge text="Medical Insurance" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Passport Details Card */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-[0px_1px_2px_0px_rgba(145,158,171,0.16)]">
          <div className="p-6">
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-[#1c252e] text-[18px] leading-[28px]">
                Passport details
              </h3>

              <div className="flex flex-col gap-2">
                <DetailRow
                  label="Issuing Country"
                  value="The Royal Oman Police"
                />
                <DetailRow label="Passport Type" value="Special" />
                <DetailRow label="Passport Number" value="N4636437" />
                <DetailRow label="Issued on" value="12 Jan 2023" />
                <DetailRow label="Expire on" value="12 Jan 2033" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex flex-1 flex-col gap-6">
        {/* Contact Card */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-[0px_1px_2px_0px_rgba(145,158,171,0.16)]">
          <div className="p-6">
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-[#1c252e] text-[18px] leading-[28px]">
                Contact
              </h3>

              <div className="flex flex-col gap-2">
                {/* Email */}
                <div className="flex h-6 items-center gap-2">
                  <EmailIcon />
                  <div className="flex-1 font-normal text-[#1c252e] text-[14px] leading-[22px]">
                    abdlomn@hotmail.com
                  </div>
                </div>

                {/* Phone */}
                <div className="flex h-6 items-center gap-2">
                  <PhoneIcon />
                  <div className="flex-1 font-normal text-[#1c252e] text-[14px] leading-[22px]">
                    3857 8738 749
                  </div>
                </div>

                {/* Residence Address */}
                <div className="flex items-start gap-2">
                  <div className="mt-0">
                    <LocationIcon />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="font-semibold text-[#1c252e] text-[16px] leading-[24px]">
                      Residence
                    </div>
                    <div className="font-normal text-[#1c252e] text-[14px] leading-[22px]">
                      2323, King Al Rahimullah street,
                    </div>
                    <div className="font-normal text-[#1c252e] text-[14px] leading-[22px]">
                      Next to Al Bateen
                    </div>
                    <div className="font-normal text-[#1c252e] text-[14px] leading-[22px]">
                      Oman
                    </div>
                    <div className="font-normal text-[#1c252e] text-[14px] leading-[22px]">
                      454434
                    </div>
                  </div>
                </div>

                {/* Permanent Address */}
                <div className="flex items-start gap-2">
                  <div className="mt-0">
                    <LocationIcon />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="font-semibold text-[#1c252e] text-[16px] leading-[24px]">
                      Permanent
                    </div>
                    <div className="font-normal text-[#1c252e] text-[14px] leading-[22px]">
                      2323, King Al Rahimullah street,
                    </div>
                    <div className="font-normal text-[#1c252e] text-[14px] leading-[22px]">
                      Next to Al Bateen
                    </div>
                    <div className="font-normal text-[#1c252e] text-[14px] leading-[22px]">
                      Oman
                    </div>
                    <div className="font-normal text-[#1c252e] text-[14px] leading-[22px]">
                      454434
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Work Relationship Details Card */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-[0px_1px_2px_0px_rgba(145,158,171,0.16)]">
          <div className="p-6">
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-[#1c252e] text-[18px] leading-[28px]">
                Work Relationship Details
              </h3>

              <div className="flex flex-col gap-2">
                <DetailRow label="Employment Type" value="Full time" />
                <DetailRow label="Experience" value="3 years" />
                <DetailRow label="Legal Entity" value="Payday Dubai" />
                <DetailRow label="Joined on" value="22 Sep 2023" />
                <DetailRow label="Confirmed on" value="22 Dec 2023" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-2 text-[#1c252e] text-[14px] leading-[22px]">
      <div className="w-60 min-w-60 font-normal">{label}</div>
      <div className="flex-1 font-semibold">{value}</div>
    </div>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <div className="flex h-6 min-w-6 items-center justify-center rounded-md bg-[rgba(145,158,171,0.16)] px-1.5 py-0">
      <div className="whitespace-nowrap text-center font-bold text-[#637381] text-[12px] leading-[20px]">
        {text}
      </div>
    </div>
  );
}

// Icon Components
function EmailIcon() {
  return (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
      <path
        d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
        fill="#637381"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
      <path
        d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z"
        fill="#637381"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
      <path
        d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9S10.62 6.5 12 6.5S14.5 7.62 14.5 9S13.38 11.5 12 11.5Z"
        fill="#637381"
      />
    </svg>
  );
}
