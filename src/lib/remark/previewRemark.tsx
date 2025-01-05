import ReactMarkdown from 'react-markdown';

const previewRemark = (content: string) => {
    return (
        <ReactMarkdown
            allowedElements={['p', 'strong', 'em']}
            components={{
                h1: 'p',
                h2: 'p',
                h3: 'p',
                img: () => null,
                p: ({ children }) => <p className='line-clamp-3'>{children}</p>,
            }}
        >
            {content}
        </ReactMarkdown>
    );
};

export default previewRemark;
