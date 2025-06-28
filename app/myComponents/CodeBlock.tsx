import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function CodeBlock({ code }: { code: string }) {
  return (
    <SyntaxHighlighter language="python" style={tomorrow}>
      {code}
    </SyntaxHighlighter>
  );
}
