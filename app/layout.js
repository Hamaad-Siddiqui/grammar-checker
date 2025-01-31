import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";
import "./globals.css";

export const metadata = {
  title: "Grammar Checker",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="min-w-[320px]">
        <body>
          <header>
            <SignedIn>
              <div className="w-full flex justify-end p-4">
                <UserButton />
              </div>
            </SignedIn>
          </header>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
