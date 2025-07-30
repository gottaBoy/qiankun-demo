declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(props: any): any;
  const url: string;
  export default url;
}

declare module 'react-flow-renderer';
declare module '@xyflow/react';

interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: any;
} 