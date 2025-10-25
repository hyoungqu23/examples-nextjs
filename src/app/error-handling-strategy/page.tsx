export default function ErrorHandlingStrategyDemo() {
  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="mb-3 text-2xl font-semibold">
        Next.js Error Handling Strategy Demo
      </h1>
      <p className="mb-6 text-zinc-600">
        5개 경계(서버/네트워크/인터렉션/렌더링/브라우저)를 구현하고 중앙
        처리기(handleError)로 수렴하는 예제입니다.
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <a className="text-blue-600 underline" href="/sign-in">
            Sign In (인터렉션 경계 + safeServerAction)
          </a>
        </li>
        <li>
          <a className="text-blue-600 underline" href="/users">
            Users (서버 컴포넌트 + error.tsx)
          </a>
        </li>
        <li>
          <a className="text-blue-600 underline" href="/users/1">
            /users/1 (네트워크 경계 + 렌더링 경계)
          </a>
        </li>
        <li>
          <a className="text-blue-600 underline" href="/users/2">
            /users/2 (렌더링 중 예상치 못한 에러 데모)
          </a>
        </li>
      </ul>

      <div className="mt-8 rounded border p-4 text-sm">
        <p className="mb-2 font-semibold">코드 위치</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            에러 코어: <code>src/error/*</code>
          </li>
          <li>
            API 경계: <code>src/app/api/users/*</code>
          </li>
          <li>
            서버 액션: <code>src/app/actions/auth.ts</code>
          </li>
          <li>
            브라우저 경계: <code>src/components/BrowserBoundary.tsx</code>
          </li>
          <li>
            렌더링 경계: <code>src/components/ErrorBoundary.tsx</code> +{" "}
            <code>app/users/error.tsx</code>
          </li>
        </ul>
      </div>
    </div>
  );
}
