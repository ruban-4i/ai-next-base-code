'use client';

// Simple SVG Logo Component
const PaydayLogo = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
  >
    <circle cx="14" cy="14" r="14" fill="#3B82F6" />
    <path
      d="M8 10h4c2 0 4 1 4 3s-2 3-4 3h-2v3H8V10zm2 4h2c1 0 2-.5 2-1s-1-1-2-1h-2v2z"
      fill="white"
    />
  </svg>
);

// Dummy data matching Figma design
const payrollData = {
  company: {
    name: 'Payday',
    address: '959 Emerson Road Winnfield, LA',
    phone: '+1 888-555-0000',
  },
  employee: {
    name: 'Balaji.K',
    id: '17309',
    position: 'Senior Software Test Engineer',
    joiningDate: '23/09/2024',
    payDate: '31/01/2025',
    paymentMethod: 'Bank Transfer',
    bankDetails: {
      name: 'Gulf National Bank',
      account: 'GNB948394834',
    },
  },
  earnings: [
    { name: 'Basic', amount: '25,054.20' },
    { name: 'House Rent Allowance', amount: '8,034.00' },
    { name: 'Mobile allowance', amount: '6,054.00' },
    { name: 'WFH allowance', amount: '7,000.00' },
    { name: 'Basic Retro Dec', amount: '8,000.00' },
    { name: 'Basic Retro Nov', amount: '8,000.00' },
    { name: 'House Rent Allowance Retro Nov', amount: '2,000.00' },
  ],
  deductions: [
    { name: 'Provident Fund', amount: '1,000.00' },
    { name: 'Social security benefits', amount: '4,300.00' },
    { name: 'Social security benefits Retro Dec', amount: '4,300.00' },
  ],
  summary: {
    totalEarnings: '64,142.20',
    totalDeductions: '9,600.00',
    netPay: '54,542.00',
    netPayWords: '(Fifty Four Thousand Five Hundred Forty Two Dirhams)',
    paidDays: '30',
    lopDays: '0',
    unpaidReversalDays: '0',
  },
};

export default function PayrollSlipView() {
  return (
    <div className="bg-white min-h-screen w-full flex justify-center py-8">
      <div className="flex w-[547px] flex-col gap-3">
        <div className="flex grow flex-col justify-between">
          <div className="flex flex-col gap-4">
            {/* Header Section */}
            <div className="flex w-full justify-between">
              <div className="flex grow flex-col gap-1">
                <div className="flex w-full items-center gap-3">
                  <div className="flex items-center gap-2">
                    <PaydayLogo />
                    <div className="font-bold text-[16px] text-[#1c252e] whitespace-nowrap">
                      Payday
                    </div>
                  </div>
                </div>
                <div className="w-full text-[9px] font-normal leading-[12px] text-[#1f1f1f]">
                  <p className="mb-0">{payrollData.company.address}</p>
                  <p>Phone: {payrollData.company.phone}</p>
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="flex w-full justify-center gap-[3px]">
              <div className="text-center text-[12px] font-semibold text-black whitespace-nowrap">
                Payslip January 2025
              </div>
            </div>

            {/* Employee Info Card */}
            <div className="w-full rounded-[12px] border border-[#dbdbdb] bg-white p-[12px] flex flex-col gap-4">
              <div className="flex w-full justify-between">
                <div className="flex flex-col gap-[5px]">
                  <div className="text-[12px] font-semibold text-black whitespace-nowrap">
                    {payrollData.employee.name}
                  </div>
                  <div className="flex items-center gap-[5px]">
                    <div className="text-[10px] font-semibold text-black whitespace-nowrap">
                      {payrollData.employee.id}
                    </div>
                    <div className="h-full w-px bg-[#acacac]" />
                    <div className="text-[10px] font-semibold text-black whitespace-nowrap">
                      {payrollData.employee.position}
                    </div>
                  </div>
                </div>
                <div className="flex w-[245px] flex-col items-end gap-1.5">
                  <div className="flex flex-col items-end gap-1 text-center">
                    <div className="text-[10px] font-semibold text-[#1c252e] whitespace-nowrap">
                      Net Pay
                    </div>
                    <div className="text-[12px] font-bold text-[#4cbb17] whitespace-nowrap">
                      AED 34,142.00
                    </div>
                  </div>
                </div>
              </div>

              {/* Employee Details */}
              <div className="flex w-full flex-col gap-[5px]">
                <div className="flex w-full items-center justify-between text-[10px]">
                  <div className="font-normal text-[#4f4f4f] whitespace-nowrap">
                    Date of Joining
                  </div>
                  <div className="font-semibold text-black whitespace-nowrap">
                    {payrollData.employee.joiningDate}
                  </div>
                </div>
                <div className="flex w-full items-center justify-between text-[10px]">
                  <div className="font-normal text-[#4f4f4f] whitespace-nowrap">
                    Pay date
                  </div>
                  <div className="font-semibold text-black whitespace-nowrap">
                    {payrollData.employee.payDate}
                  </div>
                </div>
                <div className="flex w-full items-center justify-between text-[10px]">
                  <div className="font-normal text-[#4f4f4f] whitespace-nowrap">
                    Payment method
                  </div>
                  <div className="font-semibold text-black whitespace-nowrap">
                    {payrollData.employee.paymentMethod}
                  </div>
                </div>
                <div className="flex w-full items-center justify-between">
                  <div className="text-[10px] font-normal text-[#4f4f4f] whitespace-nowrap">
                    Bank Account details
                  </div>
                  <div className="flex items-center gap-[5px]">
                    <div className="text-[10px] font-semibold text-black whitespace-nowrap">
                      {payrollData.employee.bankDetails.name}
                    </div>
                    <div className="h-full w-px bg-[#acacac]" />
                    <div className="text-[10px] font-semibold text-black whitespace-nowrap">
                      {payrollData.employee.bankDetails.account}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Earnings and Deductions Tables */}
            <div className="flex w-full gap-4 min-h-[205px]">
              {/* Earnings Table */}
              <div className="flex grow flex-col justify-between rounded-[12px] border border-[#dbdbdb]">
                <div className="flex w-full flex-col gap-1">
                  <div className="flex w-full items-center justify-between rounded-tl-[12px] rounded-tr-[12px] bg-[#eaeaea] px-3 py-2 text-[10px] font-bold text-black">
                    <div className="overflow-hidden overflow-ellipsis">
                      Earnings
                    </div>
                    <div>Amount</div>
                  </div>
                  {payrollData.earnings.map((earning, index) => (
                    <div
                      key={index}
                      className="flex w-full items-center justify-between px-3 py-0 text-[10px] font-normal text-[#1c252e]"
                    >
                      <div className="overflow-hidden overflow-ellipsis">
                        {earning.name}
                      </div>
                      <div>{earning.amount}</div>
                    </div>
                  ))}
                </div>
                <div className="flex w-full items-center justify-between rounded-[4px] px-3 py-2 text-[10px] font-bold text-black">
                  <div className="overflow-hidden overflow-ellipsis">
                    Total Gross Earnings
                  </div>
                  <div>{payrollData.summary.totalEarnings}</div>
                </div>
              </div>

              {/* Deductions Table */}
              <div className="flex grow flex-col justify-between rounded-[12px] border border-[#dbdbdb]">
                <div className="flex w-full flex-col gap-1">
                  <div className="flex w-full items-center justify-between rounded-tl-[12px] rounded-tr-[12px] bg-[#eaeaea] px-3 py-2 text-[10px] font-bold text-black">
                    <div className="overflow-hidden overflow-ellipsis">
                      Deductions
                    </div>
                    <div>Amount</div>
                  </div>
                  {payrollData.deductions.map((deduction, index) => (
                    <div
                      key={index}
                      className="flex w-full items-center justify-start gap-2 px-3 py-0 text-[10px] font-normal text-[#1c252e]"
                    >
                      <div className="grow overflow-hidden overflow-ellipsis">
                        {deduction.name}
                      </div>
                      <div>{deduction.amount}</div>
                    </div>
                  ))}
                </div>
                <div className="flex w-full items-center justify-between rounded-[4px] px-3 py-2 text-[10px] font-bold text-black">
                  <div className="overflow-hidden overflow-ellipsis">
                    Total Deductions
                  </div>
                  <div>{payrollData.summary.totalDeductions}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="w-full rounded-[12px] border border-[#dbdbdb] p-[12px] flex items-center justify-between">
            <div className="flex w-[120px] flex-col items-end gap-1 rounded-[8px]">
              <div className="flex w-full items-center justify-between text-[10px]">
                <div className="overflow-hidden overflow-ellipsis font-normal text-[#1c252e]">
                  Paid days
                </div>
                <div className="font-bold text-black">
                  {payrollData.summary.paidDays}
                </div>
              </div>
              <div className="flex w-full items-center justify-between text-[10px]">
                <div className="overflow-hidden overflow-ellipsis font-normal text-[#1c252e]">
                  LOP days
                </div>
                <div className="font-bold text-black">
                  {payrollData.summary.lopDays}
                </div>
              </div>
              <div className="flex w-full items-center justify-between text-[10px]">
                <div className="overflow-hidden overflow-ellipsis font-normal text-[#1c252e]">
                  Unpaid reversal days
                </div>
                <div className="font-bold text-black">
                  {payrollData.summary.unpaidReversalDays}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <div className="flex flex-col items-end gap-1 text-center">
                <div className="text-[12px] font-semibold text-[#1c252e] whitespace-nowrap">
                  Net Pay
                </div>
                <div className="text-[18px] font-bold text-black whitespace-nowrap">
                  AED {payrollData.summary.netPay}
                </div>
              </div>
              <div className="text-[10px] font-semibold text-black">
                {payrollData.summary.netPayWords}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex w-full items-end justify-between">
          <div className="text-[10px] font-normal text-[#1c252e] whitespace-nowrap z-[1]">
            This is a system generated payslip, signature is not required.
          </div>
        </div>
      </div>
    </div>
  );
}
