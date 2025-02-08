import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError() as Error;
  console.log('error.message', error.stack);
  return (
    <div className="flex h-screen items-center justify-center bg-white py-6 sm:py-8 lg:py-12">
      <div className="px-4 md:px-8">
        <div className="relative mx-auto flex h-96 w-full items-center justify-center overflow-hidden rounded-2xl bg-gray-100 shadow-lg sm:w-96">
          <img
            src={import.meta.env.RICK_AVATAR}
            loading="lazy"
            alt="Ops"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          <div className="relative flex flex-col items-center justify-center p-8 md:p-16">
            <h1 className="mb-2 text-center text-2xl font-bold text-slate-600 md:text-3xl lg:text-4xl">
              Oops
            </h1>
            <p className="mb-8 text-center text-slate-500 md:text-lg">
              Congratulations you found a bug
            </p>
            <a
              href={import.meta.env.RICK_ISSUE}
              target="_blank"
              className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 ring-indigo-300 outline-hidden transition duration-100 hover:bg-gray-300 focus-visible:ring-3 active:text-gray-700 md:text-base"
              rel="noreferrer">
              New issue
            </a>
          </div>
        </div>
      </div>

      <div className="prose prose-xl prose-slate max-w-none">
        <pre>
          <code>{error.stack}</code>
        </pre>
      </div>
    </div>
  );
};

export default ErrorPage;
