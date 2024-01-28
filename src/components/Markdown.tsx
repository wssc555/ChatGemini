import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import { Prism } from "react-syntax-highlighter";
import { a11yDark as style } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownProps {
    readonly className?: string;
    readonly children: string;
}

export const Markdown = (props: MarkdownProps) => {
    const { className, children } = props;
    return (
        <ReactMarkdown
            className={`prose text-sm lg:prose-base max-w-[100%] ${
                className ?? ""
            }`}
            children={children}
            components={{
                a: ({ node, ...props }) => (
                    <a href={props.href} target="_blank" rel="noreferrer">
                        {props.children}
                    </a>
                ),
                pre: ({ node, ...props }) => (
                    <pre className="bg-transparent p-0" {...props} />
                ),
                code: ({ className, children }) => {
                    const match = /language-(\w+)/.exec(className || "");
                    return match ? (
                        <Prism
                            PreTag={"div"}
                            style={style}
                            language={
                                match !== null
                                    ? match?.length > 1
                                        ? match[1]
                                        : ""
                                    : ""
                            }
                            children={String(children).replace(/\n$/, "")}
                        />
                    ) : (
                        <code className={className}>{children}</code>
                    );
                },
            }}
            rehypePlugins={[rehypeKatex]}
            remarkPlugins={[remarkGfm, remarkMath]}
        />
    );
};
