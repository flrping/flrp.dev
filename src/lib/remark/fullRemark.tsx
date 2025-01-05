import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';

const fullRemark = (content: string, endpoint: string, params?: Record<string, string>) => {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
                h1: () => null,
                img: ({ src, alt }) => {
                    const queryParams = new URLSearchParams(params).toString();
                    const query = queryParams ? `&${queryParams}` : '';
                    return (
                        <picture>
                            <source srcSet={`${endpoint}?name=${src}${query}`} type='image/webp' />
                            <img src={`${endpoint}?name=${src}${query}`} alt={alt} />
                        </picture>
                    );
                },
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                        <SyntaxHighlighter
                            style={theme}
                            language={match[1]}
                            PreTag='div'
                            className='markdown-code-block'
                            {...props}
                        >
                            {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                    ) : (
                        <code className={`markdown-inline-code ${className || ''}`} {...props}>
                            {children}
                        </code>
                    );
                },
            }}
        >
            {content}
        </ReactMarkdown>
    );
};

export default fullRemark;
