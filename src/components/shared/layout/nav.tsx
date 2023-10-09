export default function Nav() {
  return (
    <>
      <div className="fixed top-0 z-10 flex w-full justify-center">
        <div className="mx-5 flex h-16 w-full max-w-screen-xl items-center justify-between">
          <p>Task Management</p>
          <div>
            <button className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black">
              Sign In/Log out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
