import React from "react";
import Back from "./back";
import ReactMarkdown from "react-markdown";
import Copy from "./Copy";
interface TextP {
  loading: boolean;
  error: string | null;
  text: string;
}
function Text({ loading, error, text: summary }: TextP) {
  return (
    <main className="flex w-full sm:h-[80%] flex-1 items-start overflow-x-hidden justify-start sm:mt-4 mt-8 p-2 sm:p-4 sm:pl-6">
      <div className="h-[98%]  overflow-y-auto w-full">
        {/* Loading, error, and summary display */}
        {loading && <p>Loading summary...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && summary && (
          <main className="relative pb-12 ">
            <Back />
            {/* content */}
            <ReactMarkdown
              className={"text-white tracking-wide leading-loose "}
            >
              {summary}
            </ReactMarkdown>
            {/* Like and copy */}
            <Copy summary={summary} />
          </main>
        )}
      </div>
    </main>
  );
}

export default Text;
