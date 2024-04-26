import Link from "next/link";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";

interface UserReviews {
  name: string;
  review: string;
  avatarFallback: string;
}

const userReviews: UserReviews[] = [
  {
    name: "Tobechi Nwachukwu",
    review:
      "Pair programming with my team has never been easier. The real-time collaboration and code sharing features are a game changer.",
    avatarFallback: "TN",
  },
  {
    name: "Darnell Washington",
    review:
      "I've tried other pair programming tools, but this one is by far the best. The video and audio chat make it feel like we're in the same room.",
    avatarFallback: "DW",
  },
];

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]">
          <div className="container px-4 md:px-6 text-center text-white">
            <div className="max-w-3xl mx-auto space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Elevate Your Coding Collaboration
              </h1>
              <p className="text-lg md:text-xl">
                Pair program with your team in real-time, share code, and
                communicate seamlessly.
              </p>
              <div>
                <Link
                  className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium text-[#6366F1] shadow-sm transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#6366F1]"
                  href="/browse"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-start gap-4">
                <MergeIcon className="h-12 w-12 text-[#6366F1]" />
                <h3 className="text-xl font-semibold">
                  Real-Time Collaboration
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Code together in real-time, with instant updates and seamless
                  communication.
                </p>
              </div>
              <div className="flex flex-col items-start gap-4">
                <CodeIcon className="h-12 w-12 text-[#6366F1]" />
                <h3 className="text-xl font-semibold">Code Sharing</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Share your code with your team, get feedback, and collaborate
                  on projects.
                </p>
              </div>
              <div className="flex flex-col items-start gap-4">
                <VideoIcon className="h-12 w-12 text-[#6366F1]" />
                <h3 className="text-xl font-semibold">Video & Audio Chat</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Communicate with your team through high-quality video and
                  audio chat.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                What Our Users Say
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {userReviews.map((review) => (
                  <div
                    key={review.name}
                    className="bg-white dark:bg-gray-950 rounded-lg shadow-sm p-6 text-left"
                  >
                    <blockquote className="text-lg font-medium leading-relaxed">
                      {review.review}
                    </blockquote>
                    <div className="mt-4 flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage
                          alt="Avatar"
                          src={`/avatar-${review.avatarFallback}.jpg`}
                        />
                        <AvatarFallback>{review.avatarFallback}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{review.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Software Engineer
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function CodeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function MergeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 6 4-4 4 4" />
      <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" />
      <path d="m20 22-5-5" />
    </svg>
  );
}

function VideoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 8-6 4 6 4V8Z" />
      <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
    </svg>
  );
}
