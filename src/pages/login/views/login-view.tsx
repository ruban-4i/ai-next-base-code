import { LoginForm } from '../components/login-form';

export function LoginView() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-[706px] right-[34px] h-[216px] w-[216px] opacity-20">
        <div className="absolute inset-[-254%]">
          <div
            className="h-full w-full bg-center bg-cover"
            style={{
              backgroundImage:
                'url(http://localhost:3845/assets/900a298225ec46f9b20f4bdb7af566ba1249cea9.svg)',
            }}
          />
        </div>
      </div>

      <div className="absolute top-[628px] left-[-101px] h-[216px] w-[216px] opacity-20">
        <div className="absolute inset-[-254%]">
          <div
            className="h-full w-full bg-center bg-cover"
            style={{
              backgroundImage:
                'url(http://localhost:3845/assets/900a298225ec46f9b20f4bdb7af566ba1249cea9.svg)',
            }}
          />
        </div>
      </div>

      <div className="absolute top-0 left-1/4 h-[216px] w-[216px] opacity-20">
        <div className="absolute inset-[-254%]">
          <div
            className="h-full w-full bg-center bg-cover"
            style={{
              backgroundImage:
                'url(http://localhost:3845/assets/0d7145429fbb49c4d5a64c4282563181bc02fa2c.svg)',
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Illustration */}
        <div className="hidden items-center justify-center p-12 lg:flex lg:flex-1">
          <div className="w-full max-w-lg space-y-8">
            {/* Illustration */}
            <div className="relative h-[400px] w-full">
              <div
                aria-label="WIMS Illustration"
                className="h-full w-full bg-center bg-contain bg-no-repeat"
                role="img"
                style={{
                  backgroundImage:
                    'url(http://localhost:3845/assets/19f3c6a8c4856a3099d311c54b5f3a2ab38e1f76.png)',
                }}
              />
            </div>

            {/* Welcome Text */}
            <div className="text-center">
              <h2 className="font-normal text-2xl text-[#4a4a4a]">
                Welcome to WIMS Web App
              </h2>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex flex-1 items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-md">
            <div className="rounded-lg bg-white p-10 shadow-[0px_6px_32px_0px_rgba(0,0,0,0.1)]">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
