import LoginForm from "./ui/login-form";

export default function LoginPage() {
  return (
    <div className="bg-white shadow-lg px-4 sm:px-6 md:px-8 lg:px-10 py-8 space-y-5 rounded w-full md:w-[400px] lg:w-[600px]">
      <h1 className="text-2xl font-bold text-center">Code Manager</h1>
      <LoginForm />
    </div>
  );
}
